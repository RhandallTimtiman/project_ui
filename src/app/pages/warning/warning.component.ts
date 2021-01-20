import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'ngx-warning',
  templateUrl: './warning.component.html',
  styleUrls: ['./warning.component.scss']
})
export class WarningComponent implements OnInit {

  constructor(
    protected ref: NbDialogRef<WarningComponent>,
  ) { }

  ngOnInit(): void {
  }

  close() {
    this.ref.close()
  }

  acceptDeletion() {
    this.ref.close('yes')
  }
}
