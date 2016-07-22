import React from 'react'
import { render } from 'react-dom'
import KanbanBoard from './KanbanBoard'
import Search from './Search'

let cardsList = [
  {
    id: 1,
    title: "Read the BookRead the Book",
    description: "I should read the whole book.\n\n![](/public/imgs/boy.jpg)",
    color: "#bd8d31",
    status: "in-progress",
    tasks: []
  },
  {
    id: 2,
    title: "Write some code",
    description: "Code along with the samples in the book **Pro React**. The complete source can be found at [github](https://github.com/pro-react).\n\n`console.log('What?')`",
    color: "#3a7e28",
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
    color: "#b66",
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
    color: "#66b",
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
// render(
//   <KanbanBoard cards={cardsList} />,
//   document.getElementById('content')
// )

render(
  <Search />,
  document.getElementById('content')
)