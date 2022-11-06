import React, { useEffect } from "react";
import {
	Grid,
	Paper,
	Box,
	Card,
	CardHeader,
	Avatar,
	IconButton,
	CardMedia,
	CardContent,
	CardActions,
	Checkbox,
	Typography,
	Link,
	Button,
	Stack,
} from "@mui/material";
import {
	Assignment,
	CatchingPokemon,
	Favorite,
	FavoriteBorder,
	MoreVert,
	Share,
} from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { appSelector, appActions } from "../../redux/appRedux";

const Dashboard = () => {
	const dispatch = useDispatch();
	const todo = useSelector(appSelector.todo);
	useEffect(() => {
		dispatch(appActions.setPageTitle("TABLERO"));
	}, []);
	return (
		<Grid container spacing={3}>
			<Grid item md={12} xs={12}>
				<Paper sx={{ p: 2 }}>
					<Box>Dashboard</Box>
					<Stack direction="row" spacing={4} justifyContent="center" mt={5} mb={5}>
						<Box width="300px">
							<Card>
								<CardContent
									sx={{
										"&:hover": {
											backgroundColor: "#Fbf4eb",
										},
									}}
								>
									<Typography gutterBottom variant="h6" component="div">
										Tareas Completadas {todo.filter((t) => t.completed).length} de {todo.length}
									</Typography>
								</CardContent>
							</Card>
						</Box>
						<Box width="300px">
							<Card>
								<CardContent
									sx={{
										"&:hover": {
											backgroundColor: "#Fbf4eb",
										},
									}}
								>
									<Typography gutterBottom variant="h6" component="div">
										Tareas pendientes {todo.filter((t) => !t.completed).length} de {todo.length}
									</Typography>
								</CardContent>
							</Card>
						</Box>
					</Stack>
					<Stack direction="row" spacing={4} justifyContent="center" mt={5} mb={5}>
						<Box width="300px">
							<Card
								sx={{
									"&:hover": {
										backgroundColor: "#Fbf4eb",
									},
								}}
							>
								<CardMedia
									component="img"
									height="140"
									image="https://images.pexels.com/photos/3299/postit-scrabble-to-do.jpg?cs=srgb&dl=pexels-breakingpic-3299.jpg&fm=jpg"
									alt="postit image"
								/>
								<CardContent>
									<Typography gutterBottom variant="h5" component="div">
										Tareas
									</Typography>
									<Typography variant="body2" color="text.secondary">
										Gestiona todo tipo de tareas, desde las personales hasta las familiares o las
										laborales.
									</Typography>
								</CardContent>
								<CardActions sx={{ justifyContent: "center" }}>
									<RouterLink to="/todo">
										<Button size="large" endIcon={<Assignment />}>
											Ir a tareas
										</Button>
									</RouterLink>
								</CardActions>
							</Card>
						</Box>
						<Box width="300px">
							<Card
								sx={{
									"&:hover": {
										backgroundColor: "#Fbf4eb",
									},
								}}
							>
								<CardMedia
									component="img"
									height="140"
									image="https://images.pexels.com/photos/1310847/pexels-photo-1310847.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
									alt="random image"
								/>
								<CardContent>
									<Typography gutterBottom variant="h5" component="div">
										Fetch List
									</Typography>
									<Typography variant="body2" color="text.secondary">
										Todos los datos de Pokémon que necesitarás en un solo lugar, fácilmente
										accesible.
									</Typography>
								</CardContent>
								<CardActions sx={{ justifyContent: "center" }}>
									<RouterLink to="/fetch-list">
										<Button size="large" endIcon={<CatchingPokemon />}>
											Ir a fetch list
										</Button>
									</RouterLink>
								</CardActions>
							</Card>
						</Box>
					</Stack>
				</Paper>
			</Grid>
		</Grid>
	);
};
export default Dashboard;