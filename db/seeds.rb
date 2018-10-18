include Faker

if Rails.env != "production"
  # User.create(
  #   first_name: Name.first_name,
  #   last_name: Name.last_name,
  #   email: "test@test.com",
  #   password: "asdqwe123",
  #   password_confirmation: "asdqwe123",
  #   confirmed_at: Date.today
  # )

  16.times do
    Task.create(
      title: Book.title,
      theme: Hacker.say_something_smart,
      priority: rand(1..5),
      due_date: Date.today,
      is_done?: rand(2) == 1,
      user_id: 1
    )
    print '|'
  end
  puts "\nTasks created."
end