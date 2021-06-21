import axios from "axios";
const paginationWrapper = document.querySelector('.pagination');
const postListWrapper = document.querySelector('.list-unstyled');

const parPageCount = 10;
const getContent = (start, end, stopPaginationRender = false) => {
    axios.get(`http://localhost:3000/post?_start=${start}&_end=${end}`)
        .then(res => {
            const totalCount = res.headers["x-total-count"];
            const countPaginationNumber = Math.floor(totalCount / parPageCount);
            renderPostList(res.data);
            if(!stopPaginationRender){

                renderPagination(countPaginationNumber);
            }

        });
};
// Main concept parPageCount = 10;
// start = End-perPageCount = 0
// end = 1*perPageCount = 10;

// npm i -g parcel-bundler
// npm i -g json-server
// json-server --watch db.json
getContent(0, 10,false)
const renderPostList = (postList) => {
    postListWrapper.innerHTML = "";
    postList.forEach(postItem => {
        const postListItem = document.createElement("li");
        postListItem.classList.add("media");
        postListItem.classList.add("mt-4");
        const postListItemdiv = `
        
            <div class="media-body">
                <h5 class="mt-0 mb-1">${postItem.title + postItem.id}</h5>
                <div>${postItem.body}</div>
            </div>
       
    `
        postListItem.innerHTML = postListItemdiv;

        postListWrapper.appendChild(postListItem);
    });
}


const renderPagination = (countPaginationNumber) => {
    paginationWrapper.innerHTML = "";
    for (let i = 0; i < countPaginationNumber; i++) {

        const anchor = document.createElement("a");
        anchor.classList.add("page-link");
        anchor.setAttribute("href", "#");
        const count = i + 1;
        anchor.innerHTML = count;


        const pageItem = document.createElement("li");
        pageItem.classList.add("page-item");
        // pageItem.setAttribute("data-num", i + 1)
        if(i === 0){
            pageItem.classList.add("active");
        }
        pageItem.addEventListener("click", (event) => {
            const end = count * parPageCount;
            const start = end - parPageCount;
            console.log(start, end)
            getContent(start, end, true);
            // remove all active cls
            Array.from(paginationWrapper.querySelectorAll("li")).forEach((listItem) =>{
                listItem.classList.remove("active")
            })
            pageItem.classList.add("active");
        })

        pageItem.appendChild(anchor);
        paginationWrapper.appendChild(pageItem)

    }
}