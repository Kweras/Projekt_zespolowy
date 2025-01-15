import '../../../src/App.css';
import { Link } from 'react-router-dom';
import "./HomePage.css";
import { useState } from 'react';

function HomePage() {
	const [nickname, setNickname] = useState(localStorage.getItem('nickname'));
	return (

		<div className="homepage">

			<header className="homepage-header">
				<h1>Twój Internetowy Kalendarz</h1>
				<p>Zarządzaj swoim czasem efektywnie i wygodnie!</p>
				<Link to="/calendar" className="homepage-btn">
					Otwórz Kalendarz
				</Link>
			</header>

			<section className="homepage-features">
				<h2>Funkcjonalności</h2>
				<ul>
					<li>Zarządzanie wydarzeniami i przypomnieniami</li>
					<li>Widok: tygodniowy i miesięczny</li>
					<li>Synchronizacja z innymi urządzeniami</li>
					<li>Udostępnianie kalendarza znajomym</li>
				</ul>
			</section>

			{!nickname ? (
				<section className="homepage-register">
					<h2>Rozpocznij już teraz!</h2>
					<p>Załóż konto i odkryj, jak łatwo zarządzać swoim czasem.</p>
					<Link to="/register" className="homepage-btn">
						Zarejestruj się
					</Link>
				</section>
			) : (
				<section className="homepage-register">
					<h2>Witaj, {nickname}!</h2>
					<p>Przejdź do swojego kalendarza i zarządzaj swoim czasem.</p>
					<Link to="/calendar" className="homepage-btn">
						Otwórz Kalendarz
					</Link>
				</section>
			)}


		</div>
	);
};

export default HomePage;
