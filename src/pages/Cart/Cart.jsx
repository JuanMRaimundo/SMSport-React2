import { useContext, useMemo, useState } from "react";
//COMPONENTS
import { Link } from "react-router-dom";
import { CartContext } from "../../contexts/CartContext";
import Trash from "../../assets/icons/trash-icon.png";
import { Button, Table } from "react-bootstrap";
//STYLES
import "./styles.css";
import ModalConfirm from "../../utils/ModalConfirm";

function Cart() {
	const { cart, cartTotal, removeFromCart, sumTotal } = useContext(CartContext);
	const [showModal, setShowModal] = useState(false);
	const [selectedItem, setSelectedItem] = useState(null);
	const total = useMemo(() => sumTotal(), [cart]);

	const handleShowModal = (itemId) => {
		setSelectedItem(itemId);
		setShowModal(true);
	};

	const handleCloseModal = () => {
		setShowModal(false);
		setSelectedItem(null);
	};

	const handleConfirmRemove = () => {
		removeFromCart(selectedItem);
		handleCloseModal();
	};

	if (cartTotal() === 0) {
		return (
			<div className="container">
				<div className="row my-5">
					<div className="col-md-12 text-center">
						<div className="alert alert-danger" role="alert">
							No se encontraron Productos en el Carrito!
						</div>
						<Link to={"/"} className="btn btn-warning">
							Volver a la Página Principal
						</Link>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="table">
			<Table responsive>
				<thead>
					<tr>
						<th>#</th>
						<th>Producto</th>
						<th>Cantidad</th>
						<th>Eliminar</th>
						<th>Precio</th>
					</tr>
				</thead>
				<tbody>
					{cart.map((item, index) => (
						<tr key={item.id}>
							<td>{index + 1}</td>
							<td>{item.name}</td>
							<td>{item.quantity}</td>
							<td>
								<img
									src={Trash}
									alt="Eliminar"
									onClick={() => handleShowModal(item.id)}
								/>
							</td>
							<td>${item.precio * item.quantity}</td>
						</tr>
					))}
					<tr>
						<td></td>
						<td></td>
						<td colSpan={2}>Total:</td>
						<td>${total}</td>
						<td></td>
					</tr>
				</tbody>
			</Table>
			<Link to={"/Checkout"} className="btn-compra">
				<Button className="btn btn-warning">Comprar</Button>
			</Link>
			<ModalConfirm
				show={showModal}
				handleClose={handleCloseModal}
				handleConfirm={handleConfirmRemove}
				message="¿Estás seguro de que deseas eliminar este producto del carrito?"
			/>
		</div>
	);
}

export default Cart;
