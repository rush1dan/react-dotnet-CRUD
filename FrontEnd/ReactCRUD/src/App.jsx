import './App.css'
import { StudentList } from './components/StudentList'

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
