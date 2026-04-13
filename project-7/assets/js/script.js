const breedList = document.querySelector(".breedList");
const gallery = document.querySelector("#gallery");

const getBreeds = async () => {
    let res = await fetch("https://dog.ceo/api/breeds/list/all");
    let data = await res.json();
    return data.message;
};

const displayBreeds = async () => {
    let list = await getBreeds();
    let str = '';
    let count = 0;

    for (let key in list) {
        let id = `acc${count}`;

        if (list[key].length > 0) {

            let subList = '';

            list[key].forEach(sub => {
                subList += `
                    <li class="list-group-item list-group-item-action"
                        onclick="loadImages('${key}/${sub}')">
                        ${sub}
                    </li>
                `;
            });

            str += `
            <div class="accordion-item bg-dark border-0 mb-2">

                <h2 class="accordion-header">
                    <button class="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#${id}"
                        data-bs-parent="#breedAccordion">
                        ${key}
                    </button>
                </h2>

                <div id="${id}" class="accordion-collapse collapse">
                    <div class="accordion-body p-0">
                        <ul class="list-group list-group-flush">
                            ${subList}
                        </ul>
                    </div>
                </div>

            </div>
            `;

        } else {
            str += `
            <div class="accordion-item bg-dark border-0 mb-2">
                <h2 class="accordion-header">
                    <button class="accordion-button"
                        type="button"
                        onclick="loadImages('${key}')">
                        ${key}
                    </button>
                </h2>
            </div>
            `;
        }

        count++;
    }

    breedList.innerHTML = str;
};

const loadImages = async (breed) => {

    gallery.innerHTML = `
        <div class="d-flex justify-content-center align-items-center h-100 w-100">
            <div class="spinner-border text-primary"></div>
        </div>
    `;

    let res = await fetch(`https://dog.ceo/api/breed/${breed}/images`);
    let data = await res.json();

    let str = '';

    data.message.slice(0, 20).forEach(img => {
        str += `
            <div class="col-6 col-md-4 col-lg-3">
                <div class="card shadow-sm">
                    <img src="${img}" class="card-img-top">
                </div>
            </div>
        `;
    });

    gallery.innerHTML = str;
};

displayBreeds();