import entityCollisionLayerCheckbox from "./EntityCollisionLayerCheckbox.js";

export default class Options {
    constructor(restart) {
        this.restart = restart;
        this.init();
    }

    init() {
        const entityCollisionLayerCheckboxElement = document.getElementById("entityCollisionLayerCheckbox");

        entityCollisionLayerCheckboxElement.onclick = (evt) => {
            entityCollisionLayerCheckbox.setChecked(evt.target.checked);
            this.restart()
        };
    }
}