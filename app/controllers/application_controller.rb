class ApplicationController < ActionController::Base

  def getNotifications
    if (current_user)

    end
  end

  private

  # @param [Symbol<:regular, :nefarious, :visit>] level
  # @param [Symbol, String] id
  def track (level, id, **details)
    action = "#{controller_name}##{action_name}"

    event_name = "#{level}:#{id}"

    all_details = { _action: action }.merge details
    all_details = { _url: request.url } if level == :visit && request && request.url
    all_details = all_details.merge({ _link_id: @link.id, _link_owner_id: @link.user_id }) if @link
    all_details = all_details.merge({ _user_id: @user.id }) if @user
    all_details = all_details.merge({ _past_link_id: @past_link.id }) if @past_link

    ahoy.track event_name, all_details
  end

  def track_visit
    track :visit, request.path unless request.format == :json
  end

  def current_user
    @current_user ||= User.find(session[:user_id]) if session[:user_id]
  end

  helper_method :current_user

  def authorize
    redirect_to new_session_url, alert: 'Not authorized' if session[:user_id].nil?
  end

  def authorize_with_admin
    redirect_to '/', alert: 'Not authorized' unless current_user && current_user.admin
  end
end
