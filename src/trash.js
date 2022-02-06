import React from 'react';
import { useState, useEffect } from 'react';
import { Button, Card, Form } from 'react-bootstrap';

export default function Trash() {
const getData = localStorage.getItem('trash');
const trashNotes = Array.from(getData);
trashNotes.splice(0,10);
trashNotes.splice(trashNotes.length-3, trashNotes.length)
trashNotes.join();
return <div> <h2>Recent Trash</h2> <Card><div className="todo">  <span><b>Note Content</b><br /><hr /></span>{trashNotes}</div></Card></div>;
}
