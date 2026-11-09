// AnimatedBeamDemo.tsx
"use client";
import React, { forwardRef, useRef } from "react";
import Image from "next/image";
import { AnimatedBeam } from "./AnimatedBeam";
import styles from "./skills.module.css";
import AnimateHeading from "../Heading";

const Circle = forwardRef<
	HTMLDivElement,
	{
		className?: string;
		children?: React.ReactNode;
		style?: React.CSSProperties & { "--angle": string };
	}
>(({ className, children, style }, ref) => {
	return (
		<div ref={ref} className={`${styles.circle} ${className || ""}`} style={style}>
			{children}
		</div>
	);
});
Circle.displayName = "Circle";

const getRandomDelay = () => Math.random() * 3;

// Helper component untuk ngerender gambar URL dari object
const RenderIcon = ({ iconKey }: { iconKey: keyof typeof Icons }) => {
	// Kalau user, langsung return hasil fungsinya (yang berupa JSX Element)
	if (iconKey === "user") {
		return Icons.user();
	}

	// Kalau bukan user, kita kasih tau TypeScript kalau ini PASTI object dengan format ini
	const data = Icons[iconKey]() as { name: string; icon: string; url: string };

	return (
		<Image
			src={data.icon}
			alt={data.name}
			width={45}
			height={45}
		/>
	);
};


export function AnimatedBeamDemo() {
	const containerRef = useRef<HTMLDivElement>(null);
	const div1Ref = useRef<HTMLDivElement>(null);
	const div2Ref = useRef<HTMLDivElement>(null);
	const div3Ref = useRef<HTMLDivElement>(null); // Center (User)
	const div4Ref = useRef<HTMLDivElement>(null);
	const div5Ref = useRef<HTMLDivElement>(null);
	const div6Ref = useRef<HTMLDivElement>(null);
	const div7Ref = useRef<HTMLDivElement>(null);
	const div8Ref = useRef<HTMLDivElement>(null);
	const div9Ref = useRef<HTMLDivElement>(null);
	const div10Ref = useRef<HTMLDivElement>(null);
	const div11Ref = useRef<HTMLDivElement>(null);
	const div12Ref = useRef<HTMLDivElement>(null);
	const div13Ref = useRef<HTMLDivElement>(null);
	const div14Ref = useRef<HTMLDivElement>(null);
	const div15Ref = useRef<HTMLDivElement>(null);
	const div16Ref = useRef<HTMLDivElement>(null);
	const div17Ref = useRef<HTMLDivElement>(null);
	const div18Ref = useRef<HTMLDivElement>(null);
	const div19Ref = useRef<HTMLDivElement>(null);



	return (

		<div className={styles.techstackContainer} ref={containerRef}>
			<div className={styles.skillsHeaderContainer}>
				<AnimateHeading title="Skills" className={styles.skillsTitle} delay={0.5} />
			</div>
			{/* BACKGROUND VIDEO & OVERLAY */}
			<div className={styles.videoContainer}>
				{/* Ganti URL src ini sama file video lu (misal: /assets/video-bg.mp4) */}
				<video
					autoPlay
					loop
					muted
					playsInline
					className={styles.video}
					src="/video/publicvideovideo.webm"
				/>
				<div className={styles.overlay}></div>
			</div>

			{/* CONTENT ANIMATED BEAM */}
			<div className={styles.content}>
				<div className={styles.orbitContainer}>

					{/* ITEM TENGAH (USER) */}
					<Circle ref={div3Ref} className={styles.centerNode}>
						<RenderIcon iconKey="user" />
					</Circle>

					{/* ITEM SATELIT YANG MENGELILINGI */}
					<Circle ref={div1Ref} className={styles.satelliteNode} style={{ '--angle': '0deg' }}>
						<RenderIcon iconKey="html" />
					</Circle>
					<Circle ref={div2Ref} className={styles.satelliteNode} style={{ '--angle': '20deg' }}>
						<RenderIcon iconKey="css" />
					</Circle>
					<Circle ref={div7Ref} className={styles.satelliteNode} style={{ '--angle': '60deg' }}>
						<RenderIcon iconKey="laravel" />
					</Circle>
					<Circle ref={div8Ref} className={styles.satelliteNode} style={{ '--angle': '80deg' }}>
						<RenderIcon iconKey="golang" />
					</Circle>
					<Circle ref={div10Ref} className={styles.satelliteNode} style={{ '--angle': '100deg' }}>
						<RenderIcon iconKey="nodejs" />
					</Circle>
					<Circle ref={div4Ref} className={styles.satelliteNode} style={{ '--angle': '120deg' }}>
						<RenderIcon iconKey="java" />
					</Circle>
					<Circle ref={div5Ref} className={styles.satelliteNode} style={{ '--angle': '140deg' }}>
						<RenderIcon iconKey="cpp" />
					</Circle>
					<Circle ref={div6Ref} className={styles.satelliteNode} style={{ '--angle': '160deg' }}>
						<RenderIcon iconKey="csharp" />
					</Circle>
					<Circle ref={div9Ref} className={styles.satelliteNode} style={{ '--angle': '180deg' }}>
						<RenderIcon iconKey="flutter" />
					</Circle>
					<Circle ref={div11Ref} className={styles.satelliteNode} style={{ '--angle': '200deg' }}>
						<RenderIcon iconKey="javascript" />
					</Circle>
					<Circle ref={div12Ref} className={styles.satelliteNode} style={{ '--angle': '220deg' }}>
						<RenderIcon iconKey="figma" />
					</Circle>
					<Circle ref={div13Ref} className={styles.satelliteNode} style={{ '--angle': '240deg' }}>
						<RenderIcon iconKey="blender" />
					</Circle>
					<Circle ref={div14Ref} className={styles.satelliteNode} style={{ '--angle': '260deg' }}>
						<RenderIcon iconKey="github" />
					</Circle>
					<Circle ref={div15Ref} className={styles.satelliteNode} style={{ '--angle': '280deg' }}>
						<RenderIcon iconKey="mysql" />
					</Circle>
					<Circle ref={div16Ref} className={styles.satelliteNode} style={{ '--angle': '40deg' }}>
						<RenderIcon iconKey="tailwindcss" />
					</Circle>
					<Circle ref={div17Ref} className={styles.satelliteNode} style={{ '--angle': '320deg' }}>
						<RenderIcon iconKey="postman" />
					</Circle>
					<Circle ref={div18Ref} className={styles.satelliteNode} style={{ '--angle': '340deg' }}>
						<RenderIcon iconKey="git" />
					</Circle>
					<Circle ref={div19Ref} className={styles.satelliteNode} style={{ '--angle': '300deg' }}>
						<RenderIcon iconKey="prisma" />
					</Circle>
				</div>
			</div>
			<AnimatedBeam
				duration={8}
				containerRef={containerRef}
				fromRef={div1Ref}
				toRef={div3Ref}
				delay={getRandomDelay()}
				reverse
			/>
			<AnimatedBeam
				duration={8}
				containerRef={containerRef}
				fromRef={div2Ref}
				toRef={div3Ref}
				delay={getRandomDelay()}
				reverse
			/>
			<AnimatedBeam
				duration={8}
				containerRef={containerRef}
				fromRef={div4Ref}
				toRef={div3Ref}
				delay={getRandomDelay()}
				reverse
			/>
			<AnimatedBeam
				duration={8}
				containerRef={containerRef}
				fromRef={div5Ref}
				toRef={div3Ref}
				delay={getRandomDelay()}
				reverse
			/>
			<AnimatedBeam
				duration={8}
				containerRef={containerRef}
				fromRef={div6Ref}
				toRef={div3Ref}
				delay={getRandomDelay()}
				reverse
			/>
			<AnimatedBeam
				duration={8}
				containerRef={containerRef}
				fromRef={div7Ref}
				toRef={div3Ref}
				delay={getRandomDelay()}
				reverse
			/>
			<AnimatedBeam
				duration={8}
				containerRef={containerRef}
				fromRef={div8Ref}
				toRef={div3Ref}
				delay={getRandomDelay()}
				reverse
			/>
			<AnimatedBeam
				duration={8}
				containerRef={containerRef}
				fromRef={div9Ref}
				toRef={div3Ref}
				delay={getRandomDelay()}
			/>
			<AnimatedBeam
				duration={8}
				containerRef={containerRef}
				fromRef={div10Ref}
				toRef={div3Ref}
				delay={getRandomDelay()}
				reverse
			/>
			<AnimatedBeam
				duration={8}
				containerRef={containerRef}
				fromRef={div16Ref}
				toRef={div3Ref}
				delay={getRandomDelay()}
				reverse
			/>
			<AnimatedBeam
				duration={8}
				containerRef={containerRef}
				fromRef={div17Ref}
				toRef={div3Ref}
				delay={getRandomDelay()}
			/>
			<AnimatedBeam
				duration={8}
				containerRef={containerRef}
				fromRef={div18Ref}
				toRef={div3Ref}
				delay={getRandomDelay()}

			/>
			<AnimatedBeam
				duration={8}
				containerRef={containerRef}
				fromRef={div19Ref}
				toRef={div3Ref}
				delay={getRandomDelay()}
			/>
			<AnimatedBeam
				duration={8}
				containerRef={containerRef}
				fromRef={div11Ref}
				toRef={div3Ref}
				delay={getRandomDelay()}

			/>
			<AnimatedBeam
				duration={8}
				containerRef={containerRef}
				fromRef={div12Ref}
				toRef={div3Ref}
				delay={getRandomDelay()}

			/>
			<AnimatedBeam
				duration={8}
				containerRef={containerRef}
				fromRef={div13Ref}
				toRef={div3Ref}
				delay={getRandomDelay()}

			/>
			<AnimatedBeam
				duration={8}
				containerRef={containerRef}
				fromRef={div14Ref}
				toRef={div3Ref}
				delay={getRandomDelay()}

			/>
			<AnimatedBeam
				duration={8}
				containerRef={containerRef}
				fromRef={div15Ref}
				toRef={div3Ref}
				delay={getRandomDelay()}

			/>
		</div>
	);
}

const Icons = {
	user: () => (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			xmlnsXlink="http://www.w3.org/1999/xlink"
			version="1.1"
			x="0px"
			y="0px"
			width="60"
			height="60"
			viewBox="0 0 512 512"
			enableBackground="new 0 0 512 512"
			xmlSpace="preserve"
			overflow="visible"
		>
			<path
				fill="#000000"
				opacity="1.000000"
				stroke="none"
				d="
M181.750305,290.250336 
	C185.294403,293.472534 188.588104,296.444855 191.882462,299.416473 
	C197.390747,304.385101 203.326889,303.665497 209.509872,300.868103 
	C211.975800,299.752411 214.848831,297.786530 217.082443,298.276733 
	C221.543777,299.255859 225.943207,301.256256 229.852020,303.670593 
	C231.551407,304.720245 232.328217,307.742401 232.917252,310.025238 
	C235.106186,318.508484 241.277115,322.433075 249.178391,322.817230 
	C258.375580,323.264374 267.647552,322.473389 276.872131,321.954681 
	C283.244690,321.596436 287.795074,317.792145 289.323364,311.975708 
	C291.378815,304.152924 296.223724,300.524750 304.585999,299.599365 
	C303.188538,305.766724 301.987610,312.038666 300.332855,318.188538 
	C295.219177,337.193329 285.644012,353.758118 272.933807,368.728882 
	C266.928619,375.802155 264.576416,384.620758 264.023895,393.799164 
	C262.125916,425.327606 269.590179,454.987976 282.188324,483.595032 
	C284.179688,488.116913 286.241516,492.607788 288.519196,497.664490 
	C286.706482,497.807434 285.485596,497.987518 284.264648,497.987885 
	C237.942184,498.002228 191.619659,497.969818 145.297379,498.062714 
	C141.932190,498.069458 140.693008,497.120514 139.866806,493.666931 
	C136.528336,479.712128 130.606079,467.384155 116.126785,461.629547 
	C105.194069,457.284485 94.097412,458.989532 82.833984,460.416718 
	C74.337906,461.493256 65.584221,461.482269 57.029774,460.835907 
	C50.841579,460.368347 48.275246,456.203064 47.975990,449.866791 
	C47.767658,445.455597 47.478764,441.037811 46.957653,436.654846 
	C46.477249,432.614227 44.965893,429.250885 41.357689,426.612427 
	C36.009254,422.701447 37.313534,414.474884 43.581650,410.061829 
	C45.785320,408.510376 47.996269,406.969238 50.478699,405.230927 
	C46.509197,403.288879 42.764454,401.956787 39.608543,399.773560 
	C36.389381,397.546600 33.587868,394.762726 35.858612,389.893707 
	C36.903702,387.652863 36.700714,384.815399 36.991688,382.240326 
	C37.657757,376.345673 36.164566,372.155457 30.073689,369.259216 
	C24.667118,366.688385 19.384560,362.384979 21.163568,355.080841 
	C22.030464,351.521606 24.136984,347.973236 26.527122,345.130066 
	C34.043949,336.188477 41.066227,326.998535 45.474014,316.058044 
	C47.967377,309.869324 48.557854,303.600281 48.150410,296.845856 
	C46.649567,271.965302 49.573719,247.860046 61.233486,225.206314 
	C74.831413,198.786957 94.871826,179.084412 121.498108,166.312088 
	C135.051300,159.810791 149.470627,155.549469 164.707397,155.026031 
	C168.951797,154.880219 172.977188,161.028122 171.444382,165.079758 
	C171.218658,165.676437 170.781799,166.212723 170.648560,166.821991 
	C168.925858,174.698898 163.955261,178.984940 156.336243,181.442734 
	C150.147659,183.439087 147.514297,189.466049 147.227554,195.277725 
	C146.757660,204.801941 147.427658,214.407455 148.038879,223.951660 
	C148.487350,230.954514 153.183167,234.730545 159.410172,237.028717 
	C161.931793,237.959335 165.332413,238.606064 166.554474,240.518509 
	C169.011414,244.363480 170.782578,248.872925 171.750046,253.343353 
	C172.200974,255.426971 170.287689,258.143433 169.153503,260.427826 
	C164.416321,269.968994 167.439224,275.384399 173.048431,281.491852 
	C175.750381,284.433838 178.675919,287.170502 181.750305,290.250336 
z"
			/>
			<path
				fill="#000000"
				opacity="1.000000"
				stroke="none"
				d="
M184.677277,144.819687 
	C189.543091,139.980026 194.020096,135.258408 198.818375,130.889633 
	C199.864227,129.937408 202.102158,129.886276 203.711792,130.079712 
	C205.229645,130.262131 206.838394,131.063461 208.070160,132.024460 
	C215.243164,137.620560 221.583008,133.593689 228.029617,130.484894 
	C228.606796,130.206558 229.166428,129.795288 229.775482,129.694092 
	C239.531158,128.073166 244.652954,122.151520 246.200531,112.567490 
	C246.363998,111.555130 248.404968,110.142715 249.604141,110.113457 
	C258.252045,109.902504 266.907471,110.000404 275.471527,110.000404 
	C276.973267,113.957916 278.597870,117.621452 279.738678,121.429909 
	C280.755249,124.823608 282.714752,126.160942 286.141327,127.214172 
	C291.908661,128.986893 297.228607,132.171326 302.928802,134.230118 
	C304.952209,134.960938 307.820831,134.793777 309.816986,133.922134 
	C322.029266,128.589462 321.982666,128.482727 331.243042,137.742950 
	C331.596527,138.096436 331.950012,138.449875 332.303467,138.803360 
	C341.865601,148.365524 341.995178,148.432953 335.677948,160.575302 
	C334.179749,163.455017 334.682770,165.139114 336.110870,167.862396 
	C338.916504,173.212555 340.877472,179.023666 342.957001,184.728241 
	C343.848969,187.175110 344.768890,189.149353 347.540863,190.003998 
	C351.661835,191.274521 355.677246,192.887344 359.868713,194.401871 
	C359.868713,203.664551 359.868713,212.975372 359.868713,222.603806 
	C356.389435,223.825226 352.797729,225.053238 349.230316,226.347992 
	C345.885193,227.562027 343.765625,229.361435 342.690216,233.332687 
	C341.162750,238.973389 338.356659,244.314499 335.694183,249.579971 
	C334.500519,251.940521 333.927826,253.710114 335.486877,256.118042 
	C336.680145,257.960999 336.762115,260.608521 338.125366,262.240967 
	C342.840637,267.887360 339.819153,271.511841 335.422760,275.140961 
	C333.376007,276.830475 331.623383,278.876404 329.738281,280.761597 
	C321.680054,288.820129 321.570251,289.030060 311.512054,283.759705 
	C307.573547,281.695984 304.593964,281.870117 300.694824,283.875580 
	C295.605103,286.493378 289.899261,287.886292 284.629272,290.195892 
	C282.889465,290.958435 281.148163,292.678040 280.333679,294.398529 
	C278.435486,298.408173 277.099792,302.684082 275.480804,306.999908 
	C266.946136,306.999908 258.454224,307.115265 249.972015,306.880432 
	C248.639633,306.843567 246.734589,305.503845 246.164474,304.271515 
	C244.763824,301.243774 244.358673,297.733826 242.827911,294.795654 
	C241.820694,292.862396 239.799744,291.071533 237.802658,290.112488 
	C231.921432,287.288116 225.868774,284.799774 219.784546,282.433594 
	C218.227951,281.828217 216.198746,281.745392 214.578079,282.163849 
	C212.286911,282.755371 209.888168,283.665314 208.037430,285.090851 
	C202.326096,289.490082 198.562073,287.038605 194.671860,282.314880 
	C191.404022,278.346893 187.296967,275.077850 183.908051,271.196747 
	C182.963577,270.115082 183.089081,267.963715 183.037003,266.293304 
	C183.009399,265.408508 183.451172,264.336853 184.026596,263.631378 
	C192.171646,253.644989 183.305893,245.539001 181.406372,236.539474 
	C179.821793,229.032135 175.289429,226.324448 168.696915,224.917282 
	C163.342667,223.774429 161.034409,220.587570 161.879013,214.788712 
	C162.496887,210.546417 162.565643,206.047470 161.863144,201.832260 
	C160.888260,195.982590 163.828613,193.590530 168.593155,192.110107 
	C169.361115,191.871475 170.151794,191.628754 170.946259,191.564392 
	C180.307587,190.805740 179.856125,182.295181 182.806168,176.511734 
	C184.257690,173.666061 185.095596,170.464111 186.804596,167.804733 
	C188.674957,164.894241 188.391556,162.377426 186.960739,159.571198 
	C185.577057,156.857422 184.539566,153.948242 182.975174,151.350647 
	C181.317154,148.597595 182.237671,146.773483 184.677277,144.819687 
M218.024261,192.847992 
	C215.433716,201.782150 214.431961,210.818619 217.024292,219.898895 
	C223.870377,243.878983 245.112869,258.436920 270.161652,253.568390 
	C295.687744,248.607101 311.663818,224.805328 306.021210,198.474258 
	C300.666687,173.487503 274.225769,156.247208 247.209564,164.972687 
	C233.328308,169.455948 224.316391,179.172256 218.024261,192.847992 
z"
			/>
			<path
				fill="#000000"
				opacity="1.000000"
				stroke="none"
				d="
M427.331970,29.732958 
	C428.450043,30.140965 429.472168,30.065544 429.988159,30.540257 
	C433.881836,34.122341 437.558350,32.854755 441.301697,30.302383 
	C444.141876,28.365826 446.546112,28.622648 449.008911,31.363115 
	C452.218140,34.934258 455.853149,38.122822 459.245148,41.417915 
	C454.296204,48.383549 454.803253,54.725536 458.164398,62.019089 
	C460.504700,67.097427 462.894348,70.747185 468.468903,71.829674 
	C471.319275,72.383163 472.507355,74.080872 472.040070,77.043785 
	C471.809387,78.506485 471.842072,80.055428 472.027008,81.531334 
	C472.882050,88.355141 472.260132,94.044807 463.615143,95.144279 
	C459.154022,95.711647 460.364502,100.564842 458.461731,103.140244 
	C457.824768,104.002380 457.879425,105.377121 457.239319,106.234993 
	C453.505890,111.238258 454.471161,115.912193 457.918976,120.557274 
	C458.466125,121.294411 458.639374,122.309067 459.264801,123.910744 
	C457.496155,125.471909 455.092682,126.932976 453.594452,129.038254 
	C448.886353,135.653931 443.415924,137.487183 436.367035,132.779785 
	C435.853790,132.437042 434.933075,131.912445 434.666962,132.107361 
	C428.015533,136.980301 416.686615,135.671738 414.876801,147.104218 
	C414.699371,148.224869 412.647217,149.795120 411.389954,149.868591 
	C406.089325,150.178345 400.760162,149.999649 395.510040,149.999649 
	C394.494293,147.239090 393.525177,144.713852 392.636505,142.160614 
	C391.687500,139.434067 389.984558,137.630005 387.064880,137.001816 
	C385.344421,136.631653 383.383820,136.419479 382.037262,135.440338 
	C377.000214,131.777740 372.253265,131.896362 367.066681,135.229630 
	C365.974548,135.931519 363.274048,135.290253 362.019348,134.338669 
	C359.392365,132.346298 357.485321,129.389771 354.825378,127.459274 
	C350.819702,124.552109 350.681274,121.182922 353.128845,117.614380 
	C355.405945,114.294403 355.337402,111.446167 353.069427,108.278427 
	C352.151093,106.995750 351.244263,105.431244 351.094391,103.919426 
	C350.445099,97.370056 346.387054,94.448479 340.528595,92.877251 
	C339.462219,92.591255 338.380432,90.775406 338.106476,89.494537 
	C337.697693,87.583153 338.190460,85.497955 337.965454,83.524818 
	C337.192169,76.743622 337.644928,71.287399 346.290314,69.593735 
	C348.435486,69.173492 349.743347,64.177895 351.320312,61.223618 
	C354.269470,55.698620 356.403107,50.184196 351.884033,44.277264 
	C351.270386,43.475140 351.671661,41.119026 352.447266,40.179287 
	C354.661713,37.496231 357.657471,35.427879 359.709503,32.647961 
	C362.843567,28.402206 366.429138,28.615417 370.129730,31.090546 
	C373.289093,33.203674 375.999878,33.179867 378.963867,31.029924 
	C379.724884,30.477911 380.677307,30.058596 381.600006,29.881365 
	C389.257721,28.410517 393.848480,23.908298 394.858154,16.117973 
	C401.621735,16.117973 407.935577,16.117973 414.825195,16.117973 
	C415.504456,23.436567 419.466705,28.172407 427.331970,29.732958 
M408.872345,108.654442 
	C422.866425,105.186562 429.921417,95.761177 430.925507,84.524162 
	C432.270111,69.476570 418.440002,52.976719 399.679108,57.063873 
	C384.026550,60.473858 376.061554,73.858871 379.615723,88.966789 
	C382.557861,101.473106 393.554047,109.600288 408.872345,108.654442 
z"
			/>
			<path
				fill="#000000"
				opacity="1.000000"
				stroke="none"
				d="
M479.713501,244.719437 
	C476.305481,250.301987 475.269623,255.568741 479.387634,260.913727 
	C479.839996,261.500854 479.870544,262.436005 480.028168,263.223480 
	C481.101593,268.585388 484.282135,272.024963 489.676483,272.817902 
	C492.584717,273.245453 493.175995,274.648163 493.022125,277.132019 
	C492.909088,278.957245 492.720734,280.846710 493.048187,282.618439 
	C494.482849,290.380676 492.033691,295.494232 483.807617,297.021454 
	C483.165527,297.140625 482.299225,297.615143 482.070221,298.151917 
	C480.062317,302.858490 477.682251,307.495697 476.475067,312.414246 
	C475.925934,314.651459 477.321014,317.737518 478.629150,319.973480 
	C480.691589,323.498749 480.183380,325.937286 477.111328,328.448883 
	C474.675446,330.440430 472.848145,333.248688 470.264984,334.962280 
	C468.559784,336.093475 465.240448,337.032410 463.945770,336.149139 
	C458.661346,332.543762 453.991547,333.852661 448.998199,336.427063 
	C446.749908,337.586273 443.664093,337.570862 441.924042,339.151520 
	C439.775330,341.103394 437.808167,343.996887 437.250763,346.781372 
	C436.454956,350.756836 434.434967,351.201904 431.133575,351.050995 
	C426.650696,350.846100 422.151459,351.000000 417.320618,351.000000 
	C416.466766,348.794281 415.656891,346.568481 414.747101,344.384277 
	C413.487396,341.359894 411.840851,338.940674 408.273712,337.932007 
	C404.784424,336.945343 401.603760,334.898987 398.138275,333.780701 
	C396.721771,333.323639 394.730743,333.693390 393.312286,334.354614 
	C385.524475,337.984985 385.557495,338.056122 379.606842,332.103149 
	C378.782593,331.278625 378.058502,330.312012 377.118805,329.652100 
	C372.740204,326.576782 371.691193,322.700562 375.024078,318.466278 
	C378.792297,313.679016 374.494507,310.204529 373.621338,306.164551 
	C372.174896,299.472382 368.548981,294.976196 361.447266,293.880249 
	C361.011017,293.812927 360.652618,293.318634 360.226990,293.077759 
	C359.942261,292.916626 359.602570,292.852539 359.000000,292.646912 
	C359.000000,290.271149 359.299103,287.748566 358.944977,285.321320 
	C357.797974,277.459961 359.516602,271.761780 368.627930,270.628021 
	C369.528015,270.515991 370.430939,268.792358 370.952698,267.644104 
	C371.806396,265.765564 371.955841,263.472900 373.093323,261.834717 
	C376.726440,256.602509 377.754700,251.607086 373.723999,246.000778 
	C373.016693,245.016922 373.868835,242.401016 374.709595,240.949341 
	C375.676208,239.280319 377.634186,238.217758 378.806244,236.629547 
	C382.803253,231.213470 387.168335,228.513947 393.794586,232.852570 
	C395.184296,233.762512 397.920044,232.934998 399.933929,232.468933 
	C401.449768,232.118134 402.735931,230.634415 404.240479,230.399826 
	C410.520172,229.420609 414.644653,226.487762 415.799927,219.815369 
	C415.994324,218.692642 418.153473,217.473343 419.606445,217.114059 
	C421.490082,216.648300 423.606079,217.224136 425.569305,216.959900 
	C432.755951,215.992599 438.340088,217.260986 439.470337,225.827103 
	C439.576324,226.630432 440.714478,227.571640 441.589539,227.953201 
	C445.986450,229.870377 450.329285,232.208755 454.948517,233.201294 
	C457.496399,233.748749 460.817261,232.428009 463.308197,231.067841 
	C466.328400,229.418686 468.066071,230.307510 470.053345,232.478989 
	C472.523834,235.178482 475.297028,237.602798 477.739380,240.325439 
	C478.746674,241.448257 479.233490,243.037964 479.713501,244.719437 
M416.809204,307.982941 
	C418.366730,308.340698 419.953613,308.602783 421.477203,309.070984 
	C436.516144,313.692474 453.571991,299.082031 452.808990,282.840912 
	C452.095062,267.645111 438.467834,254.044571 420.586670,258.098175 
	C408.124298,260.923401 399.248016,272.442200 400.168671,285.237122 
	C400.906311,295.488892 406.582764,303.147186 416.809204,307.982941 
z"
			/>
			<path
				fill="#ffffff"
				opacity="1.000000"
				stroke="none"
				d="
M218.193726,192.479736 
	C224.316391,179.172256 233.328308,169.455948 247.209564,164.972687 
	C274.225769,156.247208 300.666687,173.487503 306.021210,198.474258 
	C311.663818,224.805328 295.687744,248.607101 270.161652,253.568390 
	C245.112869,258.436920 223.870377,243.878983 217.024292,219.898895 
	C214.431961,210.818619 215.433716,201.782150 218.193726,192.479736 
z"
			/>
			<path
				fill="#ffffff"
				opacity="1.000000"
				stroke="none"
				d="
M408.465973,108.815170 
	C393.554047,109.600288 382.557861,101.473106 379.615723,88.966789 
	C376.061554,73.858871 384.026550,60.473858 399.679108,57.063873 
	C418.440002,52.976719 432.270111,69.476570 430.925507,84.524162 
	C429.921417,95.761177 422.866425,105.186562 408.465973,108.815170 
z"
			/>
			<path
				fill="#ffffff"
				opacity="1.000000"
				stroke="none"
				d="
M416.452576,307.801147 
	C406.582764,303.147186 400.906311,295.488892 400.168671,285.237122 
	C399.248016,272.442200 408.124298,260.923401 420.586670,258.098175 
	C438.467834,254.044571 452.095062,267.645111 452.808990,282.840912 
	C453.571991,299.082031 436.516144,313.692474 421.477203,309.070984 
	C419.953613,308.602783 418.366730,308.340698 416.452576,307.801147 
z"
			/>
		</svg>
	),
	html: () => ({ name: "HTML", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg", url: "https://developer.mozilla.org/en-US/docs/Web/HTML" }),
	css: () => ({
		name: "CSS",
		icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
		url: "https://developer.mozilla.org/en-US/docs/Web/CSS"
	}),
	java: () => ({ name: "Java", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg", url: "https://www.java.com" }),
	cpp: () => ({ name: "C++", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg", url: "https://isocpp.org" }),
	csharp: () => ({ name: "C#", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg", url: "https://docs.microsoft.com/en-us/dotnet/csharp/" }),
	laravel: () => ({ name: "Laravel", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg", url: "https://laravel.com" }),
	golang: () => ({ name: "Go", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg", url: "https://go.dev" }),
	flutter: () => ({ name: "Flutter", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg", url: "https://flutter.dev" }),
	nodejs: () => ({ name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", url: "https://nodejs.org" }),
	figma: () => ({ name: "Figma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg", url: "https://www.figma.com" }),
	blender: () => ({ name: "Blender", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/blender/blender-original.svg", url: "https://www.blender.org" }),
	github: () => ({ name: "GitHub", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg", url: "https://github.com" }),
	mysql: () => ({ name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg", url: "https://www.mysql.com" }),
	tailwindcss: () => ({ name: "Tailwind CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg", url: "https://tailwindcss.com" }),
	javascript: () => ({ name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" }),
	postman: () => ({ name: "Postman", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg", url: "https://www.postman.com/" }),
	git: () => ({ name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg", url: "https://git-scm.com/" }),
	prisma: () => ({ name: "Prisma ORM", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/prisma/prisma-original.svg", url: "https://www.prisma.io/" }),

};

export default AnimatedBeamDemo;
