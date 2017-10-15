class EntityCollisionLayerCheckbox {
    constructor() {
        this.checked = false;
    }

    setChecked(checked) {
        this.checked = checked;
    }

    getChecked() {
        return this.checked;
    }
}

export default new EntityCollisionLayerCheckbox();