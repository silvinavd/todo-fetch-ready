import React, { useState, useEffect } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
export function Home() {
	const [todoList, setTodoList] = useState([]);

	useEffect(() => {
		getData();
	}, []);

	const handleKeyPress = e => {
		if (e.target.value !== "" && e.charCode === 13) {
			let newTarea = {
				label: e.target.value,
				done: false
			};
			let newTareaList = [...todoList, newTarea];
			setTodoList(newTareaList);
			updateData(newTareaList);
			e.target.value = "";
		}
	};

	//FETCH A API. TRAER DATA
	const getData = () => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/silvinavd")
			.then(resp => resp.json())
			.then(data => setTodoList(data))
			.catch(error => console.log(error));
	};

	//SUBIR DATA

	const updateData = updatedList => {
		let updatedListSend = JSON.stringify(updatedList);
		let options = {
			method: "PUT",
			body: updatedListSend,
			headers: {
				"Content-Type": "application/json"
			}
		};
		fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/silvinavd",
			options
		)
			.then(resp => resp.json())
			.then(data => console.log(data))
			.catch(error => console.log(error));
	};
	return (
		<div className="container-fluid">
			<div className="row d-flex justify-content-center">
				<div className="col-12 col-md-6 col-xl-4">
					<div className="card mt-3" style={{ width: "100%" }}>
						<input
							onKeyPress={handleKeyPress}
							placeholder="Agregar tarea"
						/>
						<ul className="list-group list-group-flush">
							{todoList.length === 0 ? (
								<li className="list-group-item">
									Ingresar tarea
								</li>
							) : (
								todoList.map((tarea, i) => (
									<li key={i} className="list-group-item">
										{tarea.label}
									</li>
								))
							)}
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
}
