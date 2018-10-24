include Faker

if Rails.env != "production"
  User.create!(
    first_name: 'D',
    last_name: 'F',
    email: "w@w",
    password: "asdasd"
  )

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