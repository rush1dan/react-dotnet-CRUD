import { useState } from 'react'
import './App.css'
import { SelectedStudent } from './components/SelectedStudent'
import { StudentList } from './components/StudentList'
import demostudents from './demostudents.json'

function App() {
	return (
		<div className='app'>
			<div className='container'>
				{/* Selected Student */}
				{/* <SelectedStudent /> */}
				{/* Student List */}
				<StudentList />
			</div>
		</div>
	)
}

export default App
