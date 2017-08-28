export class CommandSelectionChangedHandler {
    static isSingleSelected(cmd, selectedItems, selection, grid) {
        return 1 === selectedItems.length;
    }

    static isHasSelected(cmd, selectedItems, selection, grid) {
        return 1 <= selectedItems.length;
    }

    static disableOnNoSelection(cmd, selectedItems) {
        cmd.disabled = !CommandSelectionChangedHandler.isHasSelected(cmd, selectedItems);
    }

    static disableOnNotSingleSelection(cmd, selectedItems) {
        cmd.disabled = !CommandSelectionChangedHandler.isSingleSelected(cmd, selectedItems);
    }
}
