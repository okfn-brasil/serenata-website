require 'sinatra'
require 'slim'

class MyApp < Sinatra::Base
  set :public_dir, File.dirname(__FILE__) + '/public'
  set :views, File.dirname(__FILE__) + '/templates'

  get '/' do
    slim :index
  end

end

if __FILE__ == $0
  MyApp.run! :port => 4567
end
