require 'bundler/setup'
require 'juggernaut'

include Clockwork

handler do |job|
  puts "Sending random test data to channel"
  test_rotation = '
    [
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
                        "value": 47,
                        "caption": "New Things"
                    }
                },
                {
                    "id": 2,
                    "type": "number_and_text",
                    "source": "widget_count",
                    "data": {
                        "value": 5,
                        "caption": "Updated Widgets"
                    }
                }
            ]
        }
    ]'

  Juggernaut.publish('screen_1', test_rotation)
end

every(3.seconds, 'test')
