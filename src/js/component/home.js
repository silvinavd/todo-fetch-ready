import React, { useState, useEffect } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
export function Home() {
	const [todoList, setTodoList] = useState([]);
	const [mouse, setMouse] = useState();

	useEffect(() => {
		getData();
	}, []);

	//AGREGAR TAREA

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

	//ELIMINAR TAREA

	const eliminar = i => {
		let nuevaLista = todoList.filter((elem, index) => {
			if (index != i) {
				return elem;
			}
		});
		setTodoList(nuevaLista);
		updateData(nuevaLista);
	};

	//MOUSE OVER
	const mouseencima = i => {
		setMouse(i);
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
		<div className="container">
			<div className="row d-flex justify-content-center container">
				<div className="text-center mt-3">
					Escribe tu tarea y presiona Enter
					<i className="fas fa-edit ml-2 mt-1"></i>
				</div>
				<div className="card col-12 mt-3 p-0 mb-3">
					<input
						onKeyPress={handleKeyPress}
						placeholder="Agregar tarea"
						className="form-control p-1"
					/>
					<ul className="list-group list-group-flush">
						{todoList.length === 1 ? (
							<li className="list-group-item p-1">...</li>
						) : (
							todoList.map((tarea, i) => (
								<li
									key={i}
									className="list-group-item p-1"
									onClick={() => {
										eliminar(i);
									}}
									onMouseOver={() => {
										mouseencima(i);
									}}>
									{tarea.label}
									<i
										type="button"
										className={
											"fas fa-trash-alt float-right" +
											(mouse == i ? "" : " hide")
										}></i>
								</li>
							))
						)}
					</ul>
				</div>
			</div>
		</div>
	);
}
