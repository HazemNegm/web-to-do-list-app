   document.addEventListener('DOMContentLoaded', loadTasks);

    function loadTasks() {
      const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      tasks.forEach(task => createTaskElement(task.text, task.completed));
    }

    function saveTasks() {
      const taskElements = document.querySelectorAll('#taskList li');
      const tasks = Array.from(taskElements).map(li => ({
        text: li.querySelector('span').textContent,
        completed: li.classList.contains('completed')
      }));
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function createTaskElement(taskText, completed = false) {
      const li = document.createElement('li');
      if (completed) li.classList.add('completed');

      const span = document.createElement('span');
      span.textContent = taskText;
      span.onclick = () => {
        li.classList.toggle('completed');
        saveTasks();
      };

      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = '✕';
      deleteBtn.className = 'delete-task';
      deleteBtn.onclick = () => {
        li.remove();
        saveTasks();
      };

      li.appendChild(span);
      li.appendChild(deleteBtn);
      document.getElementById('taskList').appendChild(li);
    }

    function addTask() {
      const input = document.getElementById('taskInput');
      const taskText = input.value.trim();
      if (taskText === '') return;

      createTaskElement(taskText);
      saveTasks();
      input.value = '';
    }

    // Add task on Enter key
    document.getElementById('taskInput').addEventListener('keypress', function(event) {
      if (event.key === 'Enter') addTask();
    });