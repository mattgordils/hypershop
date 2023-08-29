window.onload = function () {
    updateButtonWidth();
    window.addEventListener('resize', updateButtonWidth);

    const containers = document.querySelectorAll(".hover-button-container");
    for (container of containers) {
        container.addEventListener('mouseover', (event) => {
            let target = event.currentTarget;
            let hoverButton = target.querySelector('.hover-button');
            hoverButton.classList.add("opacity-0");
        });
        container.addEventListener('mouseout', (event) => {
            let target = event.currentTarget;
            let hoverButton = target.querySelector('.hover-button');
            hoverButton.classList.remove("opacity-0");
        });

        container.addEventListener('click', (event) => {
            let container = event.currentTarget;
            const formClass = container.getAttribute("data-form-to-submit");
            if (formClass && formClass !== "") {
                const form = document.querySelector("." + formClass);
                form.submit();
            }
        });
    }
};


function updateButtonWidth() {
    const hoverButtons = document.querySelectorAll(".hover-button");
    const hoverButtonHollows = document.querySelectorAll(".hover-button-hollow");
    for (hoverButton of hoverButtons) {
        const parent = hoverButton.parentElement;
        hoverButton.setAttribute("width", parent.offsetWidth);
    }
    for (hoverButtonHollow of hoverButtonHollows) {
        const parent = hoverButtonHollow.parentElement;
        hoverButtonHollow.setAttribute("width", parent.offsetWidth);
        parent.classList.remove("invisible");
    }

}