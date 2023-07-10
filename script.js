// Function to fetch and display all blog entries
function fetchBlogEntries() {
    fetch('https://sistech-api.vercel.app/',
    {
        "name": "ical",
        "token": "e5fe227b-a6b1-4185-acd4-d6898005ee98"
    }
    )
      .then(response => response.json())
      .then(data => {
        // Clear existing entries
        document.getElementById("blog-entries").innerHTML = "";
  
        // Display new entries
        data.forEach(entry => {
          var blogEntry = document.createElement("div");
          blogEntry.classList.add("blog-entry");
  
          var titleHeading = document.createElement("h3");
          titleHeading.textContent = entry.title;
  
          var contentParagraph = document.createElement("p");
          contentParagraph.textContent = entry.content;
  
          var editLink = document.createElement("a");
          editLink.classList.add("edit-link");
          editLink.textContent = "Edit";
          editLink.addEventListener("click", function() {
            // Handle edit functionality here
            var newTitle = prompt("Enter a new title:", entry.title);
            var newContent = prompt("Enter new content:", entry.content);
  
            // Update the entry on the server
            fetch(`https://sistech-api.vercel.app/blog/`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                title: newTitle,
                content: newContent,
                id: entry.id
              })
            })
            .then(response => response.json())
            .then(updatedEntry => {
              // Update the entry in the UI
              titleHeading.textContent = updatedEntry.title;
              contentParagraph.textContent = updatedEntry.content;
            })
            .catch(error => {
              console.log("Error updating the blog entry:", error);
            });
          });
  
          // Append elements to the blog entry
          blogEntry.appendChild(titleHeading);
          blogEntry.appendChild(contentParagraph);
          blogEntry.appendChild(editLink);
  
          // Add the blog entry to the blog entries container
          document.getElementById("blog-entries").appendChild(blogEntry);
        });
      })
      .catch(error => {
        console.log("Error fetching blog entries:", error);
      });
  }
  
  // Fetch and display existing blog entries on page load
  fetchBlogEntries();
  
  // Handle new blog submission
  document.getElementById("new-blog-form").addEventListener("submit", function(event) {
    event.preventDefault();
  
    // Get the input values
    var title = document.getElementById("title").value;
    var content = document.getElementById("content").value;
  
    // Create a new blog entry on the server
    fetch("https://sistech-api.vercel.app/blog", {
      method: "POST",
      headers: {
          "Authorization": "Bearer e5fe227b-a6b1-4185-acd4-d6898005ee98",
         "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: title,
        content: content,
        owner: "e5fe227b-a6b1-4185-acd4-d6898005ee98"
      })
    })
    .then(response => response.json())
    .then(newEntry => {
      // Display the new blog entry in the UI
      var blogEntry = document.createElement("div");
      blogEntry.classList.add("blog-entry");
  
      var titleHeading = document.createElement("h3");
      titleHeading.textContent = newEntry.title;
  
      var contentParagraph = document.createElement("p");
      contentParagraph.textContent = newEntry.content;
  
      var editLink = document.createElement("a");
      editLink.classList.add("edit-link");
      editLink.textContent = "Edit";
      editLink.addEventListener("click", function() {
        // Handle edit functionality here
        var newTitle = prompt("Enter a new title:", newEntry.title);
        var newContent = prompt("Enter new content:", newEntry.content);
  
        // Update the entry on the server
        fetch(`https://sistech-api.vercel.app/blog/`, {
          method: "PUT",
          headers: {
            "Authorization": "Bearer e5fe227b-a6b1-4185-acd4-d6898005ee98",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            title: newTitle,
            content: newContent,
            id: newEntry.id
          })
        })
        .then(response => response.json())
        .then(updatedEntry => {
          // Update the entry in the UI
          titleHeading.textContent = updatedEntry.title;
          contentParagraph.textContent = updatedEntry.content;
        })
        .catch(error => {
          console.log("Error updating the blog entry:", error);
        });
      });
  
      // Append elements to the blog entry
      blogEntry.appendChild(titleHeading);
      blogEntry.appendChild(contentParagraph);
      blogEntry.appendChild(editLink);
  
      // Add the blog entry to the blog entries container
      document.getElementById("blog-entries").appendChild(blogEntry);
  
      // Clear the form inputs
      document.getElementById("title").value = "";
      document.getElementById("content").value = "";
    })
    .catch(error => {
      console.log("Error creating the blog entry:", error);
    });
  });
  