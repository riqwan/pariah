source 'https://rubygems.org'

git_source(:github) do |repo_name|
  repo_name = "#{repo_name}/#{repo_name}" unless repo_name.include?('/')
  "https://github.com/#{repo_name}.git"
end

gem 'rails', github: 'rails/rails', branch: '5-0-stable'
gem 'mysql2', '>= 0.3.18', '< 0.5'
gem 'puma', '~> 3.0'
gem 'rack-cors'
gem 'active_model_serializers'
gem 'ember-cli-rails'
gem 'devise'
gem 'wkhtmltopdf-binary'
gem 'wicked_pdf'
gem 'doorkeeper'

group :development, :test do
  gem 'pry'
  gem 'factory_girl_rails'
  gem 'shoulda-matchers', '~> 3.1'
  gem 'rspec-rails'
  gem 'spring-commands-rspec'
end

group :development do
  gem 'listen', '~> 3.0.5'
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'
end
