export const addIframeClass = (className: string) => `.${className} {
  display: none;
  position: fixed;
  bottom: 20px;
  right: 20px;
  max-width: 440px;
  height: 85vh;
  min-height: 300px;
  max-height: 600px;
  width: 100%;
  margin: auto;
  box-sizing: border-box;
  border-radius: 16px;
  border: 0;
  box-shadow: rgba(17, 17, 26, 0.1) 0 4px 16px, rgba(17, 17, 26, 0.1) 0 8px 32px;
  z-index: 150;
  animation: iframeAnimation 0.2s;
}

@keyframes iframeAnimation {
  0% {
    transform: translateY(20px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

@media (max-width: 460px) {
  .${className} {
    width: calc(100% - 20px);
    left: 10px;
    right: 10px;
    bottom: 10px;
    height: calc(100% - 20px);
  }
}
`;

export const addTriggerClass = (className: string) => `
@keyframes trigger {
  0% {
    transform: scale(1);
  }
  20% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes triggerFadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.${className} {
  display: block;
  position: fixed;
  bottom: 0;
  right: 0;
  margin: 24px;
  width: 60px;
  height: 60px;
  border: 6px solid #ffffff;
  border-radius: 50%;
  box-shadow: rgba(17, 17, 26, 0.1) 0 4px 16px, rgba(17, 17, 26, 0.1) 0 8px 32px;
  background-color: #e7e5e5;
  background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjM5MiIgdmlld0JveD0iMCAwIDYwMCAzOTIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0wIDMzNC4wNTJMMzkuMDU1OCAzOTEuOTU0SDIzMC41MDRMMjcyLjQ0NSAzNTAuMDEzTDI0NS44NTUgMjk1LjQ5NUwyMDYuNzQ4IDMzNC42MDJIODQuNjEyM0w3Mi4zODQxIDMxNi40NzNMMTg4Ljg4NCA3Ny42MTI5SDIwNS40NjhMMzU4Ljc4MyAzOTEuOTU0SDYwMFYzMzkuODU5SDUxMi41MzdWMTgyLjYxOEw0NzAuMDAxIDExOS41M0g0MjEuODE5TDM3Ny42MDUgMTYzLjc0NUw0MDQuMTk1IDIxOC4yNjNMNDQ2LjAzMiAxNzYuNDI2TDQ1Ny4wOTcgMTkyLjY1NFYzMzkuODU5SDM5Ny4xODRMMjMxLjQ0NyAwLjA0NTgzNzRIMTYyLjkwNUwwIDMzNC4wNTJaIiBmaWxsPSIjMjQyNDI0Ii8+CjxwYXRoIGQ9Ik00NTEuMzYyIDY2Ljk1N0g1MTguMjczVjAuMDQ1ODM3NEg0NTEuMzYyVjY2Ljk1N1oiIGZpbGw9IiMyNDI0MjQiLz4KPC9zdmc+Cg==);
  background-size: 60%;
  background-repeat: no-repeat;
  background-position: center;
  transition: 0.2s all ease-in-out;
  cursor: pointer;
  z-index: 100;
  opacity: 0;
  animation: triggerFadeIn 0.2s ease-in;
  animation-delay: 2s;

  @media (max-width: 460px) {
    width: 40px;
    height: 40px;
    margin: 10px;
  }
}

.${className}:hover {
  box-shadow: rgb(17, 17, 26, .3) 0 4px 26px, rgb(17, 17, 26, 0.1) 0 8px 32px;
  transform: scale(1.05);
}

.${className}.is-animated {
  animation: trigger 1.5s infinite, triggerFadeIn 1s;
  animation-delay: 2s;
  animation-fill-mode: both;
}`;
