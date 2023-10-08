export function LoadFont(props: { cssFile?: string; woff2File?: string }) {
	return (
		<>
			{props.cssFile && <link crossOrigin="anonymous" href={props.cssFile} rel="stylesheet" />}
			{props.woff2File && (
				<link
					crossOrigin="anonymous"
					rel="preload"
					href={props.woff2File}
					as="font"
					type="font/woff2"
				/>
			)}
		</>
	);
}

export const LoadInterVar = () => (
	<LoadFont woff2File="/fonts/InterV.var.woff2" cssFile="/fonts/inter-var.css" />
);

export const LoadInterVarItalic = () => (
	<LoadFont woff2File="/fonts/InterV-Italic.var.woff2" cssFile="/fonts/inter-var-italic.css" />
);
