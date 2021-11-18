import { Routes , Route } from 'react-router-dom';
import Home from '../pages/Home'
import About from '../pages/About'

export default function AppRoute() {
  return (
    <Routes >
      <Route exact path="/" element={ Home() }></Route>
      <Route exact path="/about" element={ About() }></Route>
    </Routes >
  )
}