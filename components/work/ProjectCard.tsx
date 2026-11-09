"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import style from "./ProjectCard.module.css";

// Kalo lo belom pake lucide-react, gue ganti pake SVG biar lo gak usah npm install
const ArrowIcon = () => (
    <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 19L19 5M19 5H9M19 5V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

export interface ProjectCardProps {
    title: string;
    storyHref?: string;
    description: string;
    dates: string;
    tags: readonly string[];
    image?: string;
    video?: string;
}

export function ProjectCard({
    title,
    storyHref,
    description,
    dates,
    tags,
    image,
    video,
}: ProjectCardProps) {
    const [imgError, setImgError] = useState(false);

    return (
        <div className={style.projectCardContainer}>

            {/* Media: Image atau Video */}
            <div className={style.projectMediaWrapper}>
                {video ? (
                    <video src={video} autoPlay loop muted playsInline className={style.projectMedia} />
                ) : image && !imgError ? (
                    <Image
                        src={image}
                        alt={title}
                        fill
                        loading="lazy"
                        sizes="(max-width: 480px) 90vw, 450px"
                        className={style.projectMedia}
                        onError={() => setImgError(true)}
                    />
                ) : (
                    <div className={style.projectMediaPlaceholder} />
                )}
            </div>

            {/* Konten Text & Badges */}
            <div className={style.projectContent}>

                <div className={style.projectTitleWrap}>
                    <h3 className={style.projectTitle}>{title}</h3>
                    <span className={style.projectDates}>{dates}</span>
                </div>

                {/* Deskripsi */}
                <div className={style.projectDescription}>
                    <p>{description}</p>
                </div>

                {/* Tags / Badges */}
                {tags && tags.length > 0 && (
                    <div className={style.projectTagsWrap}>
                        {tags.map((tag) => (
                            <span key={tag} className={style.projectBadge}>
                                {tag}
                            </span>
                        ))}
                    </div>
                )}

                {storyHref && (
                    <Link href={storyHref} prefetch={false} className={style.projectStoryLink}>
                        <span>Read project story</span>
                        <span className={style.projectArrowIcon}><ArrowIcon /></span>
                    </Link>
                )}

            </div>
        </div>
    );
}
