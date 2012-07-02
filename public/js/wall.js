var Wall = Wall || {};

Wall = {
  container: '',
  currentRotation: [],
  currentScene: {},
  sectionsWatched: [],
  jug: new Juggernaut,
  updateSectionsFromSource: function(source_data) {
    // Find all sections tied to this source
    $.each(Wall.currentScene['sections'], function (section) {

      if (section['source'] == source_data['source']) {
        console.log(source_data);
        section['data'] = source_data;
        Wall.renderSection(section);
      }
    });
  },
  renderSection: function(section) {
    $(Wall.container + ' #section-' + section['id']).html(
      ecoTemplates[section['type']](section['data'])
    );
  },
  changeRotation: function(data) {
    Wall.currentRotation = data;
    // TODO: Support multiple scenes within a rotation. This just looks at the first scene.
    Wall.currentScene = data['rotation'][0];
    var template_name = Wall.currentScene['layout'];

    // Render the layout
    $(Wall.container).html(
      ecoTemplates[template_name].call()
    );

    // Render the sections inside of the layout
    $.each(Wall.currentScene['sections'],function(section) {
      Wall.renderSection(section);

      // Subscribe to this section's data source
      Wall.jug.subscribe("sources/" + section['source'], function(data) {
        data = JSON.parse(data);
        Wall.updateSectionsFromSource(data);
        console.log('Updated from source: ' + data['source']);
      });
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
