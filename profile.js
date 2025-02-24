document.getElementById('upload-pic').addEventListener('change', function (event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById('profile-pic').src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});
document.addEventListener("DOMContentLoaded", function () {
    const searchBox = document.querySelector(".search-box");
    const searchIcon = searchBox.querySelector("img");

    searchIcon.addEventListener("click", function () {
        searchBox.classList.toggle("active");
    });
});

document.body.addEventListener("click", (ev) => {
    const expandableTitleBar = ev.target.closest(".expandable_title_bar");
    if (!expandableTitleBar) {
        return;
    }

    const expandable = expandableTitleBar.closest(".expandable");
    if (expandable) {
        expandable.classList.toggle("expandable--open");
    }
});
