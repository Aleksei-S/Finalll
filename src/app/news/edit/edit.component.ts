import { Component, OnInit, ViewChild, Input, Renderer2, ElementRef, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-edit',
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.css']
})

export class EditComponent implements OnInit {

    @ViewChild('editInput') editInput: ElementRef; // input

    @Input() parentMessage: any;
    @Input() canEdit: boolean;
    @Output() updateMessage: EventEmitter<string> = new EventEmitter<string>();
    @Output() removeMessage: EventEmitter<string> = new EventEmitter<string>();

    private editing = false;
    private _value: string;

    constructor(element: ElementRef, private renderer: Renderer2) {
    }

    ngOnInit() {
        console.log(this.canEdit);
    }

    edit(value) {
        this.editing = true;
        this._value = this.parentMessage.message;
        setTimeout(() => {
            this.renderer.selectRootElement('#editInput').focus();
        }, 0);
    }

    onBlur(): void {
        this.editing = false;
    }

    cancel(): void {
        this.editing = false;
    }

    save(): void {
        this.updateMessage.emit(this._value);
    }

    delete(): void {
        this.removeMessage.emit(this.parentMessage._id);
    }
}
