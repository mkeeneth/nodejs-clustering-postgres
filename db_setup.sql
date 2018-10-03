-- Table: public.note_counts
CREATE TABLE public.notecounts
(
    userid bigint,
    count bigint,
    lastadd timestamp without time zone
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.notecounts
    OWNER to nodejs;

-- Index: USERID_IDX
CREATE UNIQUE INDEX "USERID_IDX"
    ON public.notecounts USING btree
    (userid)
    TABLESPACE pg_default;


-- Table: public.notes
CREATE TABLE public.notes
(
    id int GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    userid bigint,
    title character varying(255) COLLATE pg_catalog."default",
    body character varying(5000) COLLATE pg_catalog."default",
    created timestamp without time zone
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.notes
    OWNER to nodejs;

-- Index: userid
CREATE INDEX userid
    ON public.notes USING btree
    (userId)
    TABLESPACE pg_default;