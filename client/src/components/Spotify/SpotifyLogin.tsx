import React from 'react';

const SpotifyLogin = () => {
  const clientId = '2ad4ad60ebb44ddb97c283aa06023e60';
  const loginUri = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=http://localhost:3000/spotify`;
  const handleLogin = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    window.location.assign(loginUri);
  };
  return (
    <>
      <button onClick={handleLogin}>Login to Spotify</button>
    </>
  );
};

export default SpotifyLogin;
