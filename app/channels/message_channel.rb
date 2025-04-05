class MessageChannel < ApplicationCable::Channel
  def subscribed
    stream_from "general"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def sendMessage(data)
    ActionCable.server.broadcast "general", { name: data["name"], body: data["body"] }
  end
end
