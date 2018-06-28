import { Component, OnInit, ViewChild, Input, Renderer2, ElementRef, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-edit',
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.css']
})

export class EditComponent implements OnInit {

    @Input() canEdit: boolean;
    @Input() parentMessage: any;
    @Output() removeMessage: EventEmitter<string> = new EventEmitter<string>();
    @Output() updateMessage: EventEmitter<string> = new EventEmitter<string>();
    @ViewChild('editInput') editInput: ElementRef; // input

    private _value: string;
    private editing = false;

    constructor(
      element: ElementRef,
      private renderer: Renderer2
    ) { }

    ngOnInit() {
        console.log(this.canEdit);
    }

    delete(): void {
      this.removeMessage.emit(this.parentMessage._id);
    }

    edit(value) {
      this.editing = true;
      this._value = this.parentMessage.message;
      setTimeout(() => {
          this.renderer.selectRootElement('#editInput').focus();
      }, 0);
    }

    cancel(): void {
      this.editing = false;
    }

    onBlur(): void {
        this.editing = false;
    }

    save(): void {
        this.updateMessage.emit(this._value);
    }

}
