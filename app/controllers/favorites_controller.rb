class FavoritesController < ApplicationController

  def index
    @favorites = FavoriteIssue.order('created_at DESC')
    render json: {status: 'SUCCESS', message: 'Loaded posts', data:@favorites}, status: :ok
  end

  def show
    @favorite = FavoriteIssue.find(params[:id])
    render json: {status: 'SUCCESS', message: 'Loaded posts', data:@favorite}, status: :ok
  end

  def create
    @favorite = FavoriteIssue.new(allowed_params)

    if @favorite.save
      render json: {status: 'SUCCESS', message: 'Post is saved', data:@favorite}, status: :ok
    else
      render json: {status: 'Error', message: 'Post is not saved', data:@favorite.errors}, status: :unprocessable_entity
    end
  end

  def update
    @favorite = FavoriteIssue.find(params[:id])

    if @favorite.update_attributes(allowed_params)
      render json: {status: 'SUCCESS', message: 'Post is updated', data:@favorite}, status: :ok
    else
      render json: {status: 'Error', message: 'Post is not updated', data:@favorite.errors}, status: :unprocessable_entity
    end
  end

  def destroy
    @favorite = FavoriteIssue.find(params[:id])
    @favorite.destroy

    render json: {status: 'SUCCESS', message: 'Post successfully deleted', data:@favorite}, status: :ok
  end

  private
    def allowed_params
      params.permit( :repository_url, :issue_url, :issue_id, :issue_title, :issue_author_name, :issue_author_profile, :issue_number )
    end

end