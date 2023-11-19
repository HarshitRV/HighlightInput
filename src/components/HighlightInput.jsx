import style from "./HighlightInput.module.css";
import { useRef, useState } from "react";
import ContentEditable from "react-contenteditable";

export default function HighlightInput() {
	const [html, setHtml] = useState("");
	const contentEditable = useRef(null);

	const onChangeHandler = (e) => {
		let newValue = e.target.value;

		// Remove existing spans
		newValue = newValue.replace(/<span class="\w+">(.*?)<\/span>/g, "$1");

		// Add spans
		const regex = /@\w+/g;
		
		const replacement = (match) => `<span class="${style.tag}">${match}</span>`;
		newValue = newValue.replace(regex, replacement);

		console.log(newValue);
		setHtml(newValue);
	};

	const handleSubmit = () => {
		let plainText = html;
		// Replace <div> tags with \n
		plainText = plainText.replace(/<div>/g, "\n").replace(/<\/div>/g, "");
		// Replace <span> and </span> tags with an empty string
		plainText = plainText.replace(/<span>|<\/span>/g, "");
		// Remove all other HTML tags
		plainText = plainText.replace(/<[^>]*>/g, "");
		// Replace &nbsp; with a space
		plainText = plainText.replace(/&nbsp;/g, " ");
		// Remove other HTML entity codes
		plainText = plainText.replace(/&[^;]+;/g, "");

		console.log(plainText);
	};
	return (
		<>
			<ContentEditable
				className={style.highlightinput}
				innerRef={contentEditable}
				html={html} // innerHTML of the editable div
				disabled={false} // use true to disable editing
				onChange={onChangeHandler} // handle innerHTML change
				tagName="div" // Use a custom HTML tag (uses a div by default)
			/>
			<button onClick={handleSubmit}>Submit</button>
		</>
	);
}
