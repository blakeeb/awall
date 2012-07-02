var Wall = Wall || {};

Wall = {
  container: '',
  currentRotation: {},
  jug: new Juggernaut,
  changeRotation: function(data) {
    Wall.currentRotation = data;
    // TODO: Support multiple scenes within a rotation. This just looks at the first scene.
    var new_rotation = data['rotation'][0];
    var template_name = new_rotation['layout'];

    // Render the layout
    $(Wall.container).html(
      ecoTemplates[template_name].call()
    );

    // Render the sections inside of the layout
    $.each(new_rotation['sections'],function(section) {
      $(Wall.container + ' #section-' + section['id']).html(
        ecoTemplates[section['type']](section['data'])
      );

      // Subscribe to this section's data source
    });
  },
  new: function(container, screen_number) {
    Wall.container = container;

    Wall.jug.subscribe("screens/1", function(data) {
      data = JSON.parse(data);
      if (data['updated'] != Wall.currentRotation['updated']) {
        Wall.changeRotation(data);
        console.log('Updated rotation: ' + Wall.currentRotation['updated']);
        console.log(Wall.currentRotation);
      } else {
        console.log('Data is same as last time, won\'t update');
      }
    });

    console.log('Created Wall: Screen ' + screen_number);
  }
};
