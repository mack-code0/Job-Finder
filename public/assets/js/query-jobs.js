let queriesArr = window.location.href.split("?")[1].split("&")
let queryString = window.location.search

const changeCategory = (value) => {
    alert(value)
}

const changeTime = (checkbox)=>{
    const date = new Date()
    if(checkbox.checked){
        alert()
    }else{

    }
}

const changeJobType = (element) => {
    if (element.checked) {
        if (!queryString) {
            return window.open("/job-listing/?nature=" + element.value, "_self")
        }
        queriesArr.push("nature=" + element.value)
        window.open(`/job-listing/?${queriesArr.join("&")}`, "_self")
    } else {
        queriesArr.splice(queriesArr.findIndex(e => e.includes("nature")), 1)
        window.open(`/job-listing/?${queriesArr.join("&")}`, "_self")
    }
}

const changeLocation = (location) => {
    const index = queriesArr.findIndex(e => e.includes("location"))

    if (location === "Anywhere") {
        if (index >= 0) {
            queriesArr.splice(index, 1)
        }
        return window.open(`/job-listing/?${queriesArr.join("&")}`, "_self")
    }
    if (!queryString) {
        return window.open("/job-listing/?location=" + location, "_self")
    }

    index < 0 ? queriesArr.push("location=" + location) : queriesArr[index] = "location=" + location

    window.open(`/job-listing/?${queriesArr.join("&")}`, "_self")
}
















// $.ajax({
    //     type: "POST",
    //     queryString: "/change-location",
    //     data: { _csrf: csrf_token, location: value },
    //     success: (result) => {
    //         for(doc of document.querySelector(".all-jobs"))
    //         for(job of result.jobs){
    //             $(".all-jobs").append(ht(job, result.companyMode))
    //         }
    //     }
    // })

// function ht(job, companyMode) {
//     const jobHtml = `<div class="single-job-items mb-30">
//     <div class="job-items">
//         <div class="company-img">
//             <a href="/job-details/${job._id}"><img src="assets/img/icon/job-list1.png" alt=""></a>
//         </div>
//         <div class="job-tittle job-tittle2">
//             <a href="/job-details/${job._id}">
//                 <h4>${job.role}</h4>
//             </a>
//             <ul>
//                 <li>
//                     ${companyMode?'<a href="/edit-job/<%= job._id %>" class="fas fa-edit text-dark mr-2"></a>':''}
//                     ${job.agency}
//                 </li>
//                 <li><i class="fas fa-map-marker-alt"></i>${job.location.city}, ${job.location.country}</li>
//                 <li>$${job.salary.from} - $${job.salary.to}</li>
//             </ul>
//         </div>
//     </div>
//     <div class="items-link items-link2 f-right d-flex flex-column align-items-center">
//         <a href="/job-details/${job._id}">${job.nature}</a>
//         <span>${job.createdAt}</span>
//     </div>
// </div>`
//     return jobHtml
// }