import {
  Component,
  Input,
  OnInit,
  OnChanges,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Item } from '../../item.model';
@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css'],
})
export class ItemsComponent implements OnInit, OnChanges {
  form: FormGroup;
  @Input() selectedItem: Item;
  @Output() updateItem = new EventEmitter<Item>();
  @Output() addItem = new EventEmitter<Item>();
  @Output() deleteItem = new EventEmitter<Item>();
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.createForm(this.selectedItem);
  }
  ngOnChanges(): void {
    console.log('in form', this.selectedItem);
    this.form = this.createForm(this.selectedItem);
  }

  // create a function to return a new form
  // can be resued in oninit and onchanges
  createForm(item: Item) {
    return this.fb.group({
      id: this.fb.control(item?.id, [Validators.required]),
      item: this.fb.control(item?.item, [
        Validators.required,
        Validators.minLength(2),
      ]),
      qty: this.fb.control(item?.qty, [Validators.required, Validators.min(1)]),
    });
  }

  onUpdate() {
    // as -> cast/coercion make form.value into Item
    // only fields that are the same remain
    if (this.form.value.id) {
      const formValue = this.form.value as Item;
      const updateItem: Item = formValue;
      this.updateItem.emit(updateItem);
      this.form.reset();
    }
  }

  onAdd() {
    if (this.form.value.id) {
      const formValue = this.form.value as Item;
      const addItem: Item = formValue;
      this.addItem.emit(addItem);
      this.form.reset();
    }
  }
  onDelete() {
    if (this.form.value.id) {
      const formValue = this.form.value as Item;
      const deleteItem: Item = formValue;
      this.deleteItem.emit(deleteItem);
      this.form.reset();
    }
  }

  onClear() {
    this.form.reset();
  }
}
