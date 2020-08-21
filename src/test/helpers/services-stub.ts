import { Injectable } from '@angular/core';

/* istanbul ignore next */
@Injectable()
export class MockMatDialog {

  open() {}
  /**
   * Closes all of the currently-open dialogs.
   */
  closeAll() {}
  /**
   * Finds an open dialog by its id.
   * @param id ID to use when looking up the dialog.
   */
  getDialogById(id: string) {}
}

/* istanbul ignore next */
@Injectable()
export class MockMatSnackBar {

  open() {}
}

