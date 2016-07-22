import React from 'react'
import { render } from 'react-dom'
import KanbanBoard from './KanbanBoard'

let cardsList = [
  {
    id: 1,
    title: "Read the Book",
    description: "I should read the whole book.",
    status: "in-progress",
    tasks: []
  },
  {
    id: 2,
    title: "Write some code",
    description: "Code along with the samples in the book",
    status: "todo",
    tasks: [
      {
        id: 1,
        name: "ComtactList Example",
        done: true
      },
      {
        id: 2,
        name: "Kanban Example",
        done: false
      },
      {
        id: 3,
        name: "My own experiments",
        done: false
      }
    ]
  },
  {
    id: 3,
    title: "Play the game",
    description: "I have played CS game yet.",
    status: "done",
    tasks: [
      {
        id: 1,
        name: "Set the C4 boom!",
        done: true
      }
    ]
  },
  {
    id: 4,
    title: "Cooke the food",
    description: "I should cook the reac.js food.",
    status: "todo",
    tasks: [
      {
        id: 1,
        name: "read the reac.js book.",
        done: true
      },
      {
        id: 2,
        name: "write some react code",
        done: false
      }
    ]
  }
]
render(
  <KanbanBoard cards={cardsList} />,
  document.getElementById('content')
)