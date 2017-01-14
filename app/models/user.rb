# Include default devise modules. Others available are:
# :confirmable, :lockable, :timeoutable and :omniauthable
class User < ApplicationRecord
  enum role: { customer: 0, agent: 1, admin: 2 }

  devise :database_authenticatable, :registerable, :recoverable

  validates :email, :encrypted_password, presence: true
end
