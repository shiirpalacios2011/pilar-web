import React, { useEffect, useState } from "react";
import {
	Grid,
	Box,
	Stack,
	Typography,
	CardMedia,
	Breadcrumbs,
	Card,
	CardContent,
	Button,
	Modal,
	CardActions,
	Avatar,
	Divider,
} from "@mui/material";
import { Link } from "react-router-dom";
import { ArrowBackIos, Close, MoreHoriz, NavigateNext } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { appSelector, appActions } from "../../redux/appRedux";
import api, { IMG_URL } from "../../services/api";
import POKE_IMG from "../../assets/images/poke.jpg";

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 600,
	bgcolor: "background.paper",
	border: "2px solid #000",
	boxShadow: 24,
	p: 4,
	background: "linear-gradient(to right bottom, #702673, #3e63b5)",
};

const FetchList = () => {
	const dispatch = useDispatch();
	const [pokemons, setPokemons] = useState(null);
	const [next, setNext] = useState(null);
	const [open, setOpen] = React.useState(false);
	const [pokemon, setPokemon] = useState(null);

	const handleOpen = async (url) => {
		try {
			dispatch(appActions.loading(true));

			const res = await api.GET(url);
			if (res) {
				setPokemon(res);
				setOpen(true);
			}
		} catch (error) {
			console.log(error);
		} finally {
			dispatch(appActions.loading(false));
		}
	};
	const handleClose = () => setOpen(false);

	useEffect(() => {
		dispatch(appActions.setPageTitle("LISTAS"));
		getPokemons();
	}, []);

	const getPokemons = async () => {
		try {
			dispatch(appActions.loading(true));
			const result = await api.GET(api.pokemons);
			if (result) {
				setPokemons(result.results);
				setNext(result.next);
			}
		} catch (error) {
			console.log(error);
		} finally {
			dispatch(appActions.loading(false));
		}
	};

	const loadMore = async () => {
		try {
			dispatch(appActions.loading(true));
			const result = await api.GET(next);
			if (result) {
				setPokemons([...pokemons, ...result.results]);
				setNext(result.next);
			}
		} catch (error) {
			console.log(error);
		} finally {
			dispatch(appActions.loading(false));
		}
	};

	const getPokemonImgId = (id) => {
		switch (id.length) {
			case 1:
				return `00${id}`;
			case 2:
				return `0${id}`;
			default:
				return id;
		}
	};

	const renderItem = (item) => {
		const path = item.url.split("/");
		const imgID = getPokemonImgId(path[6]);
		return (
			<Card
				p={2}
				sx={{
					display: "flex",
					height: 130,
					cursor: "pointer",
					"&:hover": { backgroundColor: "#5acdbd", color: "white" },
				}}
			>
				<CardContent sx={{ flex: "1 0 auto" }}>
					<Typography component="div" variant="h5">
						N° {path[6]}
					</Typography>
					<Typography component="div" variant="h5">
						{item.name}
					</Typography>
					<Button
						onClick={() => handleOpen(item.url)}
						size="small"
						endIcon={<MoreHoriz />}
						variant="outlined"
						color="secondary"
						sx={{ 
							mt: 1,
							'&:hover': { 
								backgroundColor: "#5acdbd",
								color: "white",
								borderColor: "white",
							 },
						}}
						
					>
						Mas detalle
					</Button>
				</CardContent>
				<CardMedia
					component="img"
					sx={{ width: 120, height: 120 }}
					src={`${IMG_URL}${imgID}.png`}
					alt="Live from space album cover"
				/>
				<Modal
					open={open}
					onClose={handleClose}
					aria-labelledby="modal-modal-title"
					aria-describedby="modal-modal-description"
				>
					<Stack>
						<Card sx={style}>
							<CardContent>
								<Stack mt={2} direction="row" spacing={1} sx={{ justifyContent: "space-around", alignItems:'center' }}>
									<Stack 
										direction='row' 
										spacing={1}
										
									>
										<Typography variant="span" color='white' >Id:</Typography>
										<Typography variant="span" sx={{ color: "#c2c211" }}>
											{pokemon?.id}
										</Typography>
									</Stack>
									<Typography
										textAlign="center"
										id="modal-modal-title"
										variant="h2"
										component="h2"
										color="#c2c211"
									>
										{pokemon?.name.toUpperCase()}
									</Typography>
								</Stack>
								<Divider />
								<Stack mt={2} direction="row" spacing={1} sx={{ justifyContent: "center" }}>
									<Typography variant="span" color='white'>Height:</Typography>
									<Typography variant="span" sx={{ color: "#c2c211", fontWeight: 'bold' }}>
										{pokemon?.height}
									</Typography>
								</Stack>

								<Stack direction="row" spacing={1} sx={{ justifyContent: "center" }}>
									<Typography variant="span" color='white' >Weight:</Typography>
									<Typography variant="span" sx={{ color: "#c2c211", fontWeight: 'bold' }}>
										{pokemon?.weight}
									</Typography>
								</Stack>
								<Stack direction="row" spacing={1} sx={{ justifyContent: "center" }}>
									<Typography variant="span" color='white' >Base Experience:</Typography>
									<Typography variant="span" sx={{ color: "#c2c211", fontWeight: 'bold' }}>
										{pokemon?.base_experience}
									</Typography>
								</Stack>
								<Avatar
									alt={pokemon?.name}
									src={pokemon?.sprites.front_default}
									sx={{
										width: 200,
										height: 200,
										margin: "auto",
										border: "2px solid #c2c211",
										backgroundColor: "#3b3b37",
										mt: 2,
										mb: 2,
										"&:hover": {
											transform: "rotate(360deg)",
											transition: "transform 1s",
										},
									}}
								/>
								<Stack direction="row" spacing={1} sx={{ justifyContent: "center" }}>
									<Typography variant="span" color='white'>Types:</Typography>
									<Typography variant="span" sx={{ color: "#c2c211", fontWeight: 'bold' }}>
										{pokemon?.types.map((item) => item.type.name.toUpperCase()).join(", ")}
									</Typography>
								</Stack>

								<Stack direction="row" spacing={1} sx={{ justifyContent: "center" }}>
									<Typography variant="span" color='white'>Abilities:</Typography>
									<Typography variant="span" sx={{ color: "#c2c211", fontWeight: 'bold' }}>
										{pokemon?.abilities.map((item) => item.ability.name.toUpperCase()).join(", ")}
									</Typography>
								</Stack>
							</CardContent>

							<CardActions
								sx={{
									justifyContent: "center",
								}}
							>
								<Button
									onClick={handleClose}
									endIcon={<Close />}
									sx={{
										backgroundColor: "#c2c211",
										color: "#3b3b37",

										"&:hover": { backgroundColor: "#3b3b37", color: "#c2c211" },
									}}
								>
									Close
								</Button>
							</CardActions>
						</Card>
					</Stack>
				</Modal>
			</Card>
		);
	};

	return (
		<>
			<Box m={2}>
				<Breadcrumbs aria-label="breadcrumb" separator={<NavigateNext fontSize="small" />}>
					<Link to="/">Home</Link>

					<Typography color="text.primary">FechList</Typography>
				</Breadcrumbs>
			</Box>
			<Grid container spacing={3}>
				<Grid item xs={12}>
					<Typography component="div" variant="h5">
						Mi Pokedex
					</Typography>
				</Grid>
				{pokemons &&
					pokemons.map((p, index) => {
						return (
							<Grid item xs={4} key={index}>
								{renderItem(p)}
							</Grid>
						);
					})}
				<Grid item xs={4}>
					<Card
						p={2}
						sx={{
							display: "flex",
							height: 130,
							cursor: "pointer",
							backgroundColor: "#317b52",
							"&:hover": { backgroundColor: "#5acdbd" },
						}}
						onClick={() => loadMore()}
					>
						<Stack direction="row" spacing={1} sx={{ justifyContent: "center", alignItems: 'center' }}>
							<CardContent sx={{ flex: "1 0 auto" }}>
								<Typography component="div" variant="h5" sx={{ color: "white" }}>
									Cargar Más
								</Typography>
							</CardContent>
							<CardMedia
								component="img"
								sx={{ 
									width: 150,
									height: 150,
									p: 3,
									
									"&:hover": { transform: "rotate(360deg)", transition: "transform 1s" },
								}}
								image={POKE_IMG}
								alt="Live from space album cover"
							/>

						</Stack>

					</Card>
				</Grid>
			</Grid>

			<Box>
				<Link to="/">
					<Stack direction="row" spacing={1} sx={{ justifyContent: "center", marginTop: 5 }}>
						<ArrowBackIos />
						<Typography>Volver</Typography>
					</Stack>
				</Link>
			</Box>
		</>
	);
};
export default FetchList;