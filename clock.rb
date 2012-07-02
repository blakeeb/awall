require 'bundler/setup'
require 'juggernaut'

include Clockwork

handler do |job|
  puts "Sending random test data to channel"
  test_rotation = '
    {
      "updated": "2012070100",
      "rotation": [
        {
          "layout": "graph_with_boxes",
          "duration": 10,
          "immediate": false,
          "sections": [
            {
              "id": 1,
              "type": "number_and_text",
              "source": "thing_count",
              "data": {
                "value": "2",
                "caption": "New Things"
              }
            },
            {
              "id": 2,
              "type": "number_and_text",
              "source": "widget_count",
              "data": {
                "value": "2",
                "caption": "Updated Widgets"
              }
            }
          ]
        }
      ]
    }'

  Juggernaut.publish('screens/1', test_rotation) if job == 'rotation'

  Juggernaut.publish('sources/thing_count', '
      {
        "value": "' + rand(100).to_s + '",
        "caption": "Things"
      }
    ') if job == 'source_1'

  Juggernaut.publish('sources/widget_count', '
      {
        "value": "' + rand(100).to_s + '",
        "caption": "Widgets"
      }
    ') if job == 'source_2'
end

# TODO: send when a screen subscribes
every(10.seconds, 'rotation')

# TODO: only update sources which have subscribers
every(4.seconds, 'source_1')
every(5.seconds, 'source_2')
