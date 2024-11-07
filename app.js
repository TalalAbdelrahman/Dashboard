const usersDiv = document.getElementById('users');
const PostsDiv = document.getElementById('posts');
let currentUser = null;

function showUsers() {
    let request = new XMLHttpRequest();
    request.open("GET", "https://jsonplaceholder.typicode.com/users");
    request.responseType = "json";
    request.setRequestHeader("Content-Type", "application/json");
    request.setRequestHeader("Accept", "application/json");
    request.send();

    request.onload = function () {
        let response = this.response;
        let status = this.status;
        
        if (status >= 200 && status < 300) {
            response.forEach(({ id, name, email }) => {
                let user = document.createElement("div");
                user.className = "user";
                user.innerHTML += `
                    <h3>${name}</h3>
                    <p>${email}</p>`
                usersDiv.appendChild(user)

                user.addEventListener("click", function () {
                    PostsDiv.innerHTML = '';

                    // إزالة الحدود من المستخدم الحالي إذا كان موجودًا
                    if (currentUser) {
                        currentUser.style.borderLeft = "none";
                    }

                    // إذا لم يكن المستخدم الحالي يحمل الحدود، أضف الحدود له
                    if (user.style.borderLeft !== "3px solid #E3313F") {
                        user.style.borderLeft = "3px solid #E3313F";
                        currentUser = user; // تحديث المستخدم الحالي
                    } else {
                        // إذا كان المستخدم يحمل الحدود، أزلها
                        user.style.borderLeft = "none";
                        currentUser = null; // إعادة تعيين المستخدم الحالي
                    }
                    showPosts(id)
                });

            });
        }
    };
}


function showPosts(userId) {
    let request = new XMLHttpRequest();
    request.open("GET", `https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
    request.responseType = "json";
    request.setRequestHeader("Content-Type", "application/json");
    request.setRequestHeader("Accept", "application/json");
    request.send();

    request.onload = function () {
        let response = this.response;
        let status = this.status;
        
        if (status >= 200 && status < 300) {
            response.forEach(({ title, body }) => {
                let post = document.createElement("div");
                post.className = "post";
                post.innerHTML += `
                <h3>${title}</h3>
                <hr>
                <p>${body}</p>`;
                PostsDiv.appendChild(post)
            });
        }
    };
}

showUsers();