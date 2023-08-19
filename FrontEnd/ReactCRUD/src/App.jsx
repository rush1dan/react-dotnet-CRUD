import { useState } from 'react'
import './App.css'
import { SelectedStudent } from './components/SelectedStudent'
import { StudentList } from './components/StudentList'
import { StudentPicture } from './components/StudentPicture'

function App() {
	return (
		<div className='app'>
			{/* Student DP */}
			<StudentPicture src=""/>

			{/* Selected Student */}
			<SelectedStudent />

			{/* Student List */}
			<StudentList />
		</div>
	)
}

export default App
