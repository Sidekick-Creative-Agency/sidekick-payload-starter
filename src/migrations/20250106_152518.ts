import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_archive_layout" AS ENUM('grid', 'carousel');
  CREATE TYPE "public"."enum_pages_blocks_archive_navigation_type" AS ENUM('arrows', 'dots', 'both', 'none');
  CREATE TYPE "public"."enum_pages_blocks_form_block_styles_global_width" AS ENUM('full', 'boxed', 'narrow');
  CREATE TYPE "public"."enum_pages_blocks_form_block_styles_resp_pad_hor_desk_unit" AS ENUM('rem', 'px', '%');
  CREATE TYPE "public"."enum_pages_blocks_form_block_styles_resp_pad_vert_desk_unit" AS ENUM('rem', 'px', '%');
  CREATE TYPE "public"."enum_pages_blocks_form_block_styles_resp_pad_hor_tab_unit" AS ENUM('rem', 'px', '%');
  CREATE TYPE "public"."enum_pages_blocks_form_block_styles_resp_pad_vert_tab_unit" AS ENUM('rem', 'px', '%');
  CREATE TYPE "public"."enum_pages_blocks_form_block_styles_resp_pad_hor_mb_unit" AS ENUM('rem', 'px', '%');
  CREATE TYPE "public"."enum_pages_blocks_form_block_styles_resp_pad_vert_mb_unit" AS ENUM('rem', 'px', '%');
  CREATE TYPE "public"."enum_pages_blocks_columns_block_columns_type" AS ENUM('text', 'media');
  CREATE TYPE "public"."enum_pages_blocks_columns_block_columns_size" AS ENUM('oneThird', 'half', 'twoThirds', 'full');
  CREATE TYPE "public"."enum_pages_blocks_columns_block_columns_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."pb_columns_block_content_columns_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."p_blocks_columns_block_content_columns_media_border_radius" AS ENUM('none', 'small', 'medium', 'large', 'xl', 'xxl', 'full');
  CREATE TYPE "public"."enum_pages_blocks_columns_block_styles_global_width" AS ENUM('full', 'boxed');
  CREATE TYPE "public"."enum__pages_v_blocks_archive_layout" AS ENUM('grid', 'carousel');
  CREATE TYPE "public"."enum__pages_v_blocks_archive_navigation_type" AS ENUM('arrows', 'dots', 'both', 'none');
  CREATE TYPE "public"."enum__pages_v_blocks_form_block_styles_global_width" AS ENUM('full', 'boxed', 'narrow');
  CREATE TYPE "public"."enum__pages_v_blocks_form_block_styles_resp_pad_hor_desk_unit" AS ENUM('rem', 'px', '%');
  CREATE TYPE "public"."enum__pages_v_blocks_form_block_styles_resp_pad_vert_desk_unit" AS ENUM('rem', 'px', '%');
  CREATE TYPE "public"."enum__pages_v_blocks_form_block_styles_resp_pad_hor_tab_unit" AS ENUM('rem', 'px', '%');
  CREATE TYPE "public"."enum__pages_v_blocks_form_block_styles_resp_pad_vert_tab_unit" AS ENUM('rem', 'px', '%');
  CREATE TYPE "public"."enum__pages_v_blocks_form_block_styles_resp_pad_hor_mb_unit" AS ENUM('rem', 'px', '%');
  CREATE TYPE "public"."enum__pages_v_blocks_form_block_styles_resp_pad_vert_mb_unit" AS ENUM('rem', 'px', '%');
  CREATE TYPE "public"."enum__pages_v_blocks_columns_block_columns_type" AS ENUM('text', 'media');
  CREATE TYPE "public"."enum__pages_v_blocks_columns_block_columns_size" AS ENUM('oneThird', 'half', 'twoThirds', 'full');
  CREATE TYPE "public"."enum__pages_v_blocks_columns_block_columns_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_columns_block_styles_global_width" AS ENUM('full', 'boxed');
  CREATE TYPE "public"."enum_listings_availability" AS ENUM('for-sale', 'for-lease');
  CREATE TYPE "public"."enum_listings_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__listings_v_version_availability" AS ENUM('for-sale', 'for-lease');
  CREATE TYPE "public"."enum__listings_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_team_members_socials_platform" AS ENUM('facebook', 'instagram', 'linkedin', 'twitter', 'youtube');
  CREATE TYPE "public"."enum_forms_blocks_checkbox_width" AS ENUM('oneThird', 'half', 'twoThirds', 'full');
  CREATE TYPE "public"."enum_forms_blocks_country_width" AS ENUM('oneThird', 'half', 'twoThirds', 'full');
  CREATE TYPE "public"."enum_forms_blocks_email_width" AS ENUM('oneThird', 'half', 'twoThirds', 'full');
  CREATE TYPE "public"."enum_forms_blocks_number_width" AS ENUM('oneThird', 'half', 'twoThirds', 'full');
  CREATE TYPE "public"."enum_forms_blocks_state_width" AS ENUM('oneThird', 'half', 'twoThirds', 'full');
  CREATE TYPE "public"."enum_forms_blocks_text_width" AS ENUM('oneThird', 'half', 'twoThirds', 'full');
  CREATE TYPE "public"."enum_forms_blocks_textarea_width" AS ENUM('oneThird', 'half', 'twoThirds', 'full');
  CREATE TYPE "public"."enum_forms_blocks_phone_number_width" AS ENUM('oneThird', 'half', 'twoThirds', 'full');
  CREATE TYPE "public"."enum_header_nav_items_nav_item_side" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum_header_nav_items_nav_item_type" AS ENUM('link', 'parent');
  CREATE TYPE "public"."enum_header_nav_items_nav_item_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_header_nav_items_nav_item_parent_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_header_nav_items_nav_item_children_links_link_type" AS ENUM('reference', 'custom');
  CREATE TABLE IF NOT EXISTS "pages_blocks_columns_block_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"type" "enum_pages_blocks_columns_block_columns_type" DEFAULT 'text',
  	"size" "enum_pages_blocks_columns_block_columns_size" DEFAULT 'half',
  	"background_color" varchar,
  	"background_image_id" integer,
  	"enable_subtitle" boolean,
  	"subtitle" varchar,
  	"rich_text" jsonb,
  	"enable_link" boolean,
  	"link_type" "enum_pages_blocks_columns_block_columns_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "pb_columns_block_content_columns_link_appearance" DEFAULT 'default',
  	"media_id" integer,
  	"media_border_radius" "p_blocks_columns_block_content_columns_media_border_radius" DEFAULT 'none',
  	"styles_enable_top_border" boolean DEFAULT false,
  	"styles_border_color" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_columns_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"styles_global_width" "enum_pages_blocks_columns_block_styles_global_width" DEFAULT 'boxed',
  	"styles_global_background_color" varchar,
  	"styles_resp_reverse_wrap" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_number_counters_block_number_counters" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"prefix" varchar,
  	"number" numeric,
  	"label" varchar,
  	"suffix" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_number_counters_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_expertise_block_expertise_areas" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"image_id" integer,
  	"accent_color" varchar,
  	"link_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_expertise_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_columns_block_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"type" "enum__pages_v_blocks_columns_block_columns_type" DEFAULT 'text',
  	"size" "enum__pages_v_blocks_columns_block_columns_size" DEFAULT 'half',
  	"background_color" varchar,
  	"background_image_id" integer,
  	"enable_subtitle" boolean,
  	"subtitle" varchar,
  	"rich_text" jsonb,
  	"enable_link" boolean,
  	"link_type" "enum__pages_v_blocks_columns_block_columns_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "pb_columns_block_content_columns_link_appearance" DEFAULT 'default',
  	"media_id" integer,
  	"media_border_radius" "p_blocks_columns_block_content_columns_media_border_radius" DEFAULT 'none',
  	"styles_enable_top_border" boolean DEFAULT false,
  	"styles_border_color" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_columns_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"styles_global_width" "enum__pages_v_blocks_columns_block_styles_global_width" DEFAULT 'boxed',
  	"styles_global_background_color" varchar,
  	"styles_resp_reverse_wrap" boolean,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_number_counters_block_number_counters" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"prefix" varchar,
  	"number" numeric,
  	"label" varchar,
  	"suffix" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_number_counters_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_expertise_block_expertise_areas" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"image_id" integer,
  	"accent_color" varchar,
  	"link_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_expertise_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "listings_image_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "listings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"featured_image_id" integer,
  	"description" jsonb,
  	"price" numeric,
  	"availability" "enum_listings_availability",
  	"status" "enum_listings_status",
  	"area" numeric,
  	"acreage" numeric,
  	"street_address" varchar,
  	"city" varchar,
  	"state" varchar,
  	"zip_code" varchar,
  	"latitude" numeric,
  	"longitude" numeric,
  	"attachments_id" integer,
  	"meta_title" varchar,
  	"meta_image_id" integer,
  	"meta_description" varchar,
  	"published_at" timestamp(3) with time zone,
  	"slug" varchar,
  	"slug_lock" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_listings_status" DEFAULT 'draft'
  );
  
  CREATE TABLE IF NOT EXISTS "listings_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"property_types_id" integer,
  	"team_members_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "_listings_v_version_image_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_listings_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_featured_image_id" integer,
  	"version_description" jsonb,
  	"version_price" numeric,
  	"version_availability" "enum__listings_v_version_availability",
  	"version_status" "enum__listings_v_version_status",
  	"version_area" numeric,
  	"version_acreage" numeric,
  	"version_street_address" varchar,
  	"version_city" varchar,
  	"version_state" varchar,
  	"version_zip_code" varchar,
  	"version_latitude" numeric,
  	"version_longitude" numeric,
  	"version_attachments_id" integer,
  	"version_meta_title" varchar,
  	"version_meta_image_id" integer,
  	"version_meta_description" varchar,
  	"version_published_at" timestamp(3) with time zone,
  	"version_slug" varchar,
  	"version_slug_lock" boolean DEFAULT true,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__listings_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE IF NOT EXISTS "_listings_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"property_types_id" integer,
  	"team_members_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "attachments" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE IF NOT EXISTS "property_types" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "reviews" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"job_title" varchar NOT NULL,
  	"review" varchar NOT NULL,
  	"image_id" integer NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "team_members_socials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"platform" "enum_team_members_socials_platform",
  	"url" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "team_members" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"job_title" varchar NOT NULL,
  	"bio" varchar NOT NULL,
  	"image_id" integer NOT NULL,
  	"designations" varchar,
  	"email" varchar,
  	"phone" varchar,
  	"eductation_and_certifications" jsonb,
  	"notable_transactions" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "forms_blocks_phone_number" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"label" varchar DEFAULT 'Phone Number',
  	"width" "enum_forms_blocks_phone_number_width",
  	"default_value" varchar,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "header_nav_items_nav_item_children_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_header_nav_items_nav_item_children_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar
  );
  
  ALTER TABLE "forms_blocks_checkbox" ALTER COLUMN "width" SET DATA TYPE enum_forms_blocks_checkbox_width;
  ALTER TABLE "forms_blocks_country" ALTER COLUMN "width" SET DATA TYPE enum_forms_blocks_country_width;
  ALTER TABLE "forms_blocks_email" ALTER COLUMN "width" SET DATA TYPE enum_forms_blocks_email_width;
  ALTER TABLE "forms_blocks_number" ALTER COLUMN "width" SET DATA TYPE enum_forms_blocks_number_width;
  ALTER TABLE "forms_blocks_number" ALTER COLUMN "default_value" SET DATA TYPE varchar;
  ALTER TABLE "forms_blocks_state" ALTER COLUMN "width" SET DATA TYPE enum_forms_blocks_state_width;
  ALTER TABLE "forms_blocks_text" ALTER COLUMN "width" SET DATA TYPE enum_forms_blocks_text_width;
  ALTER TABLE "forms_blocks_textarea" ALTER COLUMN "width" SET DATA TYPE enum_forms_blocks_textarea_width;
  ALTER TABLE "pages_blocks_archive" ADD COLUMN "layout" "enum_pages_blocks_archive_layout" DEFAULT 'grid';
  ALTER TABLE "pages_blocks_archive" ADD COLUMN "navigation_type" "enum_pages_blocks_archive_navigation_type" DEFAULT 'arrows';
  ALTER TABLE "pages_blocks_form_block" ADD COLUMN "styles_global_width" "enum_pages_blocks_form_block_styles_global_width" DEFAULT 'boxed';
  ALTER TABLE "pages_blocks_form_block" ADD COLUMN "styles_resp_pad_hor_desk_val" numeric DEFAULT 2.5;
  ALTER TABLE "pages_blocks_form_block" ADD COLUMN "styles_resp_pad_hor_desk_unit" "enum_pages_blocks_form_block_styles_resp_pad_hor_desk_unit" DEFAULT 'rem';
  ALTER TABLE "pages_blocks_form_block" ADD COLUMN "styles_resp_pad_vert_desk_val" numeric DEFAULT 5;
  ALTER TABLE "pages_blocks_form_block" ADD COLUMN "styles_resp_pad_vert_desk_unit" "enum_pages_blocks_form_block_styles_resp_pad_vert_desk_unit" DEFAULT 'rem';
  ALTER TABLE "pages_blocks_form_block" ADD COLUMN "styles_resp_pad_hor_tab_val" numeric DEFAULT 2.5;
  ALTER TABLE "pages_blocks_form_block" ADD COLUMN "styles_resp_pad_hor_tab_unit" "enum_pages_blocks_form_block_styles_resp_pad_hor_tab_unit" DEFAULT 'rem';
  ALTER TABLE "pages_blocks_form_block" ADD COLUMN "styles_resp_pad_vert_tab_val" numeric DEFAULT 5;
  ALTER TABLE "pages_blocks_form_block" ADD COLUMN "styles_resp_pad_vert_tab_unit" "enum_pages_blocks_form_block_styles_resp_pad_vert_tab_unit" DEFAULT 'rem';
  ALTER TABLE "pages_blocks_form_block" ADD COLUMN "styles_resp_pad_hor_mb_val" numeric DEFAULT 1.25;
  ALTER TABLE "pages_blocks_form_block" ADD COLUMN "styles_resp_pad_hor_mb_unit" "enum_pages_blocks_form_block_styles_resp_pad_hor_mb_unit" DEFAULT 'rem';
  ALTER TABLE "pages_blocks_form_block" ADD COLUMN "styles_resp_pad_vert_mb_val" numeric DEFAULT 4;
  ALTER TABLE "pages_blocks_form_block" ADD COLUMN "styles_resp_pad_vert_mb_unit" "enum_pages_blocks_form_block_styles_resp_pad_vert_mb_unit" DEFAULT 'rem';
  ALTER TABLE "_pages_v_blocks_archive" ADD COLUMN "layout" "enum__pages_v_blocks_archive_layout" DEFAULT 'grid';
  ALTER TABLE "_pages_v_blocks_archive" ADD COLUMN "navigation_type" "enum__pages_v_blocks_archive_navigation_type" DEFAULT 'arrows';
  ALTER TABLE "_pages_v_blocks_form_block" ADD COLUMN "styles_global_width" "enum__pages_v_blocks_form_block_styles_global_width" DEFAULT 'boxed';
  ALTER TABLE "_pages_v_blocks_form_block" ADD COLUMN "styles_resp_pad_hor_desk_val" numeric DEFAULT 2.5;
  ALTER TABLE "_pages_v_blocks_form_block" ADD COLUMN "styles_resp_pad_hor_desk_unit" "enum__pages_v_blocks_form_block_styles_resp_pad_hor_desk_unit" DEFAULT 'rem';
  ALTER TABLE "_pages_v_blocks_form_block" ADD COLUMN "styles_resp_pad_vert_desk_val" numeric DEFAULT 5;
  ALTER TABLE "_pages_v_blocks_form_block" ADD COLUMN "styles_resp_pad_vert_desk_unit" "enum__pages_v_blocks_form_block_styles_resp_pad_vert_desk_unit" DEFAULT 'rem';
  ALTER TABLE "_pages_v_blocks_form_block" ADD COLUMN "styles_resp_pad_hor_tab_val" numeric DEFAULT 2.5;
  ALTER TABLE "_pages_v_blocks_form_block" ADD COLUMN "styles_resp_pad_hor_tab_unit" "enum__pages_v_blocks_form_block_styles_resp_pad_hor_tab_unit" DEFAULT 'rem';
  ALTER TABLE "_pages_v_blocks_form_block" ADD COLUMN "styles_resp_pad_vert_tab_val" numeric DEFAULT 5;
  ALTER TABLE "_pages_v_blocks_form_block" ADD COLUMN "styles_resp_pad_vert_tab_unit" "enum__pages_v_blocks_form_block_styles_resp_pad_vert_tab_unit" DEFAULT 'rem';
  ALTER TABLE "_pages_v_blocks_form_block" ADD COLUMN "styles_resp_pad_hor_mb_val" numeric DEFAULT 1.25;
  ALTER TABLE "_pages_v_blocks_form_block" ADD COLUMN "styles_resp_pad_hor_mb_unit" "enum__pages_v_blocks_form_block_styles_resp_pad_hor_mb_unit" DEFAULT 'rem';
  ALTER TABLE "_pages_v_blocks_form_block" ADD COLUMN "styles_resp_pad_vert_mb_val" numeric DEFAULT 4;
  ALTER TABLE "_pages_v_blocks_form_block" ADD COLUMN "styles_resp_pad_vert_mb_unit" "enum__pages_v_blocks_form_block_styles_resp_pad_vert_mb_unit" DEFAULT 'rem';
  ALTER TABLE "redirects_rels" ADD COLUMN "listings_id" integer;
  ALTER TABLE "search_rels" ADD COLUMN "listings_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "listings_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "attachments_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "property_types_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "reviews_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "team_members_id" integer;
  ALTER TABLE "header_nav_items" ADD COLUMN "nav_item_side" "enum_header_nav_items_nav_item_side" DEFAULT 'right';
  ALTER TABLE "header_nav_items" ADD COLUMN "nav_item_type" "enum_header_nav_items_nav_item_type";
  ALTER TABLE "header_nav_items" ADD COLUMN "nav_item_link_type" "enum_header_nav_items_nav_item_link_type" DEFAULT 'reference';
  ALTER TABLE "header_nav_items" ADD COLUMN "nav_item_link_new_tab" boolean;
  ALTER TABLE "header_nav_items" ADD COLUMN "nav_item_link_url" varchar;
  ALTER TABLE "header_nav_items" ADD COLUMN "nav_item_link_label" varchar;
  ALTER TABLE "header_nav_items" ADD COLUMN "nav_item_label" varchar;
  ALTER TABLE "header_nav_items" ADD COLUMN "nav_item_enable_parent_link" boolean DEFAULT false;
  ALTER TABLE "header_nav_items" ADD COLUMN "nav_item_parent_link_type" "enum_header_nav_items_nav_item_parent_link_type" DEFAULT 'reference';
  ALTER TABLE "header_nav_items" ADD COLUMN "nav_item_parent_link_new_tab" boolean;
  ALTER TABLE "header_nav_items" ADD COLUMN "nav_item_parent_link_url" varchar;
  ALTER TABLE "header_nav_items" ADD COLUMN "nav_item_parent_link_label" varchar;
  ALTER TABLE "header" ADD COLUMN "logo_id" integer;
  ALTER TABLE "header" ADD COLUMN "logo_alt_id" integer;
  ALTER TABLE "footer" ADD COLUMN "logo_id" integer;
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_columns_block_columns" ADD CONSTRAINT "pages_blocks_columns_block_columns_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_columns_block_columns" ADD CONSTRAINT "pages_blocks_columns_block_columns_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_columns_block_columns" ADD CONSTRAINT "pages_blocks_columns_block_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_columns_block"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_columns_block" ADD CONSTRAINT "pages_blocks_columns_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_number_counters_block_number_counters" ADD CONSTRAINT "pages_blocks_number_counters_block_number_counters_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_number_counters_block"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_number_counters_block" ADD CONSTRAINT "pages_blocks_number_counters_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_expertise_block_expertise_areas" ADD CONSTRAINT "pages_blocks_expertise_block_expertise_areas_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_expertise_block_expertise_areas" ADD CONSTRAINT "pages_blocks_expertise_block_expertise_areas_link_id_pages_id_fk" FOREIGN KEY ("link_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_expertise_block_expertise_areas" ADD CONSTRAINT "pages_blocks_expertise_block_expertise_areas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_expertise_block"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_expertise_block" ADD CONSTRAINT "pages_blocks_expertise_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_columns_block_columns" ADD CONSTRAINT "_pages_v_blocks_columns_block_columns_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_columns_block_columns" ADD CONSTRAINT "_pages_v_blocks_columns_block_columns_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_columns_block_columns" ADD CONSTRAINT "_pages_v_blocks_columns_block_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_columns_block"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_columns_block" ADD CONSTRAINT "_pages_v_blocks_columns_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_number_counters_block_number_counters" ADD CONSTRAINT "_pages_v_blocks_number_counters_block_number_counters_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_number_counters_block"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_number_counters_block" ADD CONSTRAINT "_pages_v_blocks_number_counters_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_expertise_block_expertise_areas" ADD CONSTRAINT "_pages_v_blocks_expertise_block_expertise_areas_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_expertise_block_expertise_areas" ADD CONSTRAINT "_pages_v_blocks_expertise_block_expertise_areas_link_id_pages_id_fk" FOREIGN KEY ("link_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_expertise_block_expertise_areas" ADD CONSTRAINT "_pages_v_blocks_expertise_block_expertise_areas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_expertise_block"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_expertise_block" ADD CONSTRAINT "_pages_v_blocks_expertise_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "listings_image_gallery" ADD CONSTRAINT "listings_image_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "listings_image_gallery" ADD CONSTRAINT "listings_image_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."listings"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "listings" ADD CONSTRAINT "listings_featured_image_id_media_id_fk" FOREIGN KEY ("featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "listings" ADD CONSTRAINT "listings_attachments_id_attachments_id_fk" FOREIGN KEY ("attachments_id") REFERENCES "public"."attachments"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "listings" ADD CONSTRAINT "listings_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "listings_rels" ADD CONSTRAINT "listings_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."listings"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "listings_rels" ADD CONSTRAINT "listings_rels_property_types_fk" FOREIGN KEY ("property_types_id") REFERENCES "public"."property_types"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "listings_rels" ADD CONSTRAINT "listings_rels_team_members_fk" FOREIGN KEY ("team_members_id") REFERENCES "public"."team_members"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_listings_v_version_image_gallery" ADD CONSTRAINT "_listings_v_version_image_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_listings_v_version_image_gallery" ADD CONSTRAINT "_listings_v_version_image_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_listings_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_listings_v" ADD CONSTRAINT "_listings_v_parent_id_listings_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."listings"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_listings_v" ADD CONSTRAINT "_listings_v_version_featured_image_id_media_id_fk" FOREIGN KEY ("version_featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_listings_v" ADD CONSTRAINT "_listings_v_version_attachments_id_attachments_id_fk" FOREIGN KEY ("version_attachments_id") REFERENCES "public"."attachments"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_listings_v" ADD CONSTRAINT "_listings_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_listings_v_rels" ADD CONSTRAINT "_listings_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_listings_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_listings_v_rels" ADD CONSTRAINT "_listings_v_rels_property_types_fk" FOREIGN KEY ("property_types_id") REFERENCES "public"."property_types"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_listings_v_rels" ADD CONSTRAINT "_listings_v_rels_team_members_fk" FOREIGN KEY ("team_members_id") REFERENCES "public"."team_members"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "reviews" ADD CONSTRAINT "reviews_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "team_members_socials" ADD CONSTRAINT "team_members_socials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."team_members"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "team_members" ADD CONSTRAINT "team_members_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "forms_blocks_phone_number" ADD CONSTRAINT "forms_blocks_phone_number_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "header_nav_items_nav_item_children_links" ADD CONSTRAINT "header_nav_items_nav_item_children_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header_nav_items"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "pages_blocks_columns_block_columns_order_idx" ON "pages_blocks_columns_block_columns" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_columns_block_columns_parent_id_idx" ON "pages_blocks_columns_block_columns" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_columns_block_columns_background_image_idx" ON "pages_blocks_columns_block_columns" USING btree ("background_image_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_columns_block_columns_media_idx" ON "pages_blocks_columns_block_columns" USING btree ("media_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_columns_block_order_idx" ON "pages_blocks_columns_block" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_columns_block_parent_id_idx" ON "pages_blocks_columns_block" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_columns_block_path_idx" ON "pages_blocks_columns_block" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_number_counters_block_number_counters_order_idx" ON "pages_blocks_number_counters_block_number_counters" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_number_counters_block_number_counters_parent_id_idx" ON "pages_blocks_number_counters_block_number_counters" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_number_counters_block_order_idx" ON "pages_blocks_number_counters_block" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_number_counters_block_parent_id_idx" ON "pages_blocks_number_counters_block" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_number_counters_block_path_idx" ON "pages_blocks_number_counters_block" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_expertise_block_expertise_areas_order_idx" ON "pages_blocks_expertise_block_expertise_areas" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_expertise_block_expertise_areas_parent_id_idx" ON "pages_blocks_expertise_block_expertise_areas" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_expertise_block_expertise_areas_image_idx" ON "pages_blocks_expertise_block_expertise_areas" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_expertise_block_expertise_areas_link_idx" ON "pages_blocks_expertise_block_expertise_areas" USING btree ("link_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_expertise_block_order_idx" ON "pages_blocks_expertise_block" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_expertise_block_parent_id_idx" ON "pages_blocks_expertise_block" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_expertise_block_path_idx" ON "pages_blocks_expertise_block" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_columns_block_columns_order_idx" ON "_pages_v_blocks_columns_block_columns" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_columns_block_columns_parent_id_idx" ON "_pages_v_blocks_columns_block_columns" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_columns_block_columns_background_image_idx" ON "_pages_v_blocks_columns_block_columns" USING btree ("background_image_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_columns_block_columns_media_idx" ON "_pages_v_blocks_columns_block_columns" USING btree ("media_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_columns_block_order_idx" ON "_pages_v_blocks_columns_block" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_columns_block_parent_id_idx" ON "_pages_v_blocks_columns_block" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_columns_block_path_idx" ON "_pages_v_blocks_columns_block" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_number_counters_block_number_counters_order_idx" ON "_pages_v_blocks_number_counters_block_number_counters" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_number_counters_block_number_counters_parent_id_idx" ON "_pages_v_blocks_number_counters_block_number_counters" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_number_counters_block_order_idx" ON "_pages_v_blocks_number_counters_block" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_number_counters_block_parent_id_idx" ON "_pages_v_blocks_number_counters_block" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_number_counters_block_path_idx" ON "_pages_v_blocks_number_counters_block" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_expertise_block_expertise_areas_order_idx" ON "_pages_v_blocks_expertise_block_expertise_areas" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_expertise_block_expertise_areas_parent_id_idx" ON "_pages_v_blocks_expertise_block_expertise_areas" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_expertise_block_expertise_areas_image_idx" ON "_pages_v_blocks_expertise_block_expertise_areas" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_expertise_block_expertise_areas_link_idx" ON "_pages_v_blocks_expertise_block_expertise_areas" USING btree ("link_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_expertise_block_order_idx" ON "_pages_v_blocks_expertise_block" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_expertise_block_parent_id_idx" ON "_pages_v_blocks_expertise_block" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_expertise_block_path_idx" ON "_pages_v_blocks_expertise_block" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "listings_image_gallery_order_idx" ON "listings_image_gallery" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "listings_image_gallery_parent_id_idx" ON "listings_image_gallery" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "listings_image_gallery_image_idx" ON "listings_image_gallery" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "listings_featured_image_idx" ON "listings" USING btree ("featured_image_id");
  CREATE INDEX IF NOT EXISTS "listings_attachments_idx" ON "listings" USING btree ("attachments_id");
  CREATE INDEX IF NOT EXISTS "listings_meta_meta_image_idx" ON "listings" USING btree ("meta_image_id");
  CREATE INDEX IF NOT EXISTS "listings_slug_idx" ON "listings" USING btree ("slug");
  CREATE INDEX IF NOT EXISTS "listings_updated_at_idx" ON "listings" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "listings_created_at_idx" ON "listings" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "listings__status_idx" ON "listings" USING btree ("_status");
  CREATE INDEX IF NOT EXISTS "listings_rels_order_idx" ON "listings_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "listings_rels_parent_idx" ON "listings_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "listings_rels_path_idx" ON "listings_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "listings_rels_property_types_id_idx" ON "listings_rels" USING btree ("property_types_id");
  CREATE INDEX IF NOT EXISTS "listings_rels_team_members_id_idx" ON "listings_rels" USING btree ("team_members_id");
  CREATE INDEX IF NOT EXISTS "_listings_v_version_image_gallery_order_idx" ON "_listings_v_version_image_gallery" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_listings_v_version_image_gallery_parent_id_idx" ON "_listings_v_version_image_gallery" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_listings_v_version_image_gallery_image_idx" ON "_listings_v_version_image_gallery" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "_listings_v_parent_idx" ON "_listings_v" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "_listings_v_version_version_featured_image_idx" ON "_listings_v" USING btree ("version_featured_image_id");
  CREATE INDEX IF NOT EXISTS "_listings_v_version_version_attachments_idx" ON "_listings_v" USING btree ("version_attachments_id");
  CREATE INDEX IF NOT EXISTS "_listings_v_version_meta_version_meta_image_idx" ON "_listings_v" USING btree ("version_meta_image_id");
  CREATE INDEX IF NOT EXISTS "_listings_v_version_version_slug_idx" ON "_listings_v" USING btree ("version_slug");
  CREATE INDEX IF NOT EXISTS "_listings_v_version_version_updated_at_idx" ON "_listings_v" USING btree ("version_updated_at");
  CREATE INDEX IF NOT EXISTS "_listings_v_version_version_created_at_idx" ON "_listings_v" USING btree ("version_created_at");
  CREATE INDEX IF NOT EXISTS "_listings_v_version_version__status_idx" ON "_listings_v" USING btree ("version__status");
  CREATE INDEX IF NOT EXISTS "_listings_v_created_at_idx" ON "_listings_v" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "_listings_v_updated_at_idx" ON "_listings_v" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "_listings_v_latest_idx" ON "_listings_v" USING btree ("latest");
  CREATE INDEX IF NOT EXISTS "_listings_v_autosave_idx" ON "_listings_v" USING btree ("autosave");
  CREATE INDEX IF NOT EXISTS "_listings_v_rels_order_idx" ON "_listings_v_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "_listings_v_rels_parent_idx" ON "_listings_v_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "_listings_v_rels_path_idx" ON "_listings_v_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "_listings_v_rels_property_types_id_idx" ON "_listings_v_rels" USING btree ("property_types_id");
  CREATE INDEX IF NOT EXISTS "_listings_v_rels_team_members_id_idx" ON "_listings_v_rels" USING btree ("team_members_id");
  CREATE INDEX IF NOT EXISTS "attachments_updated_at_idx" ON "attachments" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "attachments_created_at_idx" ON "attachments" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "attachments_filename_idx" ON "attachments" USING btree ("filename");
  CREATE INDEX IF NOT EXISTS "property_types_updated_at_idx" ON "property_types" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "property_types_created_at_idx" ON "property_types" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "reviews_image_idx" ON "reviews" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "reviews_updated_at_idx" ON "reviews" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "reviews_created_at_idx" ON "reviews" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "team_members_socials_order_idx" ON "team_members_socials" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "team_members_socials_parent_id_idx" ON "team_members_socials" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "team_members_image_idx" ON "team_members" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "team_members_updated_at_idx" ON "team_members" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "team_members_created_at_idx" ON "team_members" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "forms_blocks_phone_number_order_idx" ON "forms_blocks_phone_number" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "forms_blocks_phone_number_parent_id_idx" ON "forms_blocks_phone_number" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "forms_blocks_phone_number_path_idx" ON "forms_blocks_phone_number" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "header_nav_items_nav_item_children_links_order_idx" ON "header_nav_items_nav_item_children_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "header_nav_items_nav_item_children_links_parent_id_idx" ON "header_nav_items_nav_item_children_links" USING btree ("_parent_id");
  DO $$ BEGIN
   ALTER TABLE "redirects_rels" ADD CONSTRAINT "redirects_rels_listings_fk" FOREIGN KEY ("listings_id") REFERENCES "public"."listings"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_listings_fk" FOREIGN KEY ("listings_id") REFERENCES "public"."listings"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_listings_fk" FOREIGN KEY ("listings_id") REFERENCES "public"."listings"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_attachments_fk" FOREIGN KEY ("attachments_id") REFERENCES "public"."attachments"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_property_types_fk" FOREIGN KEY ("property_types_id") REFERENCES "public"."property_types"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_reviews_fk" FOREIGN KEY ("reviews_id") REFERENCES "public"."reviews"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_team_members_fk" FOREIGN KEY ("team_members_id") REFERENCES "public"."team_members"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "header" ADD CONSTRAINT "header_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "header" ADD CONSTRAINT "header_logo_alt_id_media_id_fk" FOREIGN KEY ("logo_alt_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "footer" ADD CONSTRAINT "footer_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "redirects_rels_listings_id_idx" ON "redirects_rels" USING btree ("listings_id");
  CREATE INDEX IF NOT EXISTS "search_rels_listings_id_idx" ON "search_rels" USING btree ("listings_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_listings_id_idx" ON "payload_locked_documents_rels" USING btree ("listings_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_attachments_id_idx" ON "payload_locked_documents_rels" USING btree ("attachments_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_property_types_id_idx" ON "payload_locked_documents_rels" USING btree ("property_types_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_reviews_id_idx" ON "payload_locked_documents_rels" USING btree ("reviews_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_team_members_id_idx" ON "payload_locked_documents_rels" USING btree ("team_members_id");
  CREATE INDEX IF NOT EXISTS "header_logo_idx" ON "header" USING btree ("logo_id");
  CREATE INDEX IF NOT EXISTS "header_logo_alt_idx" ON "header" USING btree ("logo_alt_id");
  CREATE INDEX IF NOT EXISTS "footer_logo_idx" ON "footer" USING btree ("logo_id");
  ALTER TABLE "header_nav_items" DROP COLUMN IF EXISTS "link_type";
  ALTER TABLE "header_nav_items" DROP COLUMN IF EXISTS "link_new_tab";
  ALTER TABLE "header_nav_items" DROP COLUMN IF EXISTS "link_url";
  ALTER TABLE "header_nav_items" DROP COLUMN IF EXISTS "link_label";
  DROP TYPE "public"."enum_header_nav_items_link_type";`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   CREATE TYPE "public"."enum_header_nav_items_link_type" AS ENUM('reference', 'custom');
  ALTER TABLE "pages_blocks_columns_block_columns" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_columns_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_number_counters_block_number_counters" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_number_counters_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_expertise_block_expertise_areas" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_expertise_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_columns_block_columns" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_columns_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_number_counters_block_number_counters" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_number_counters_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_expertise_block_expertise_areas" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_expertise_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "listings_image_gallery" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "listings" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "listings_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_listings_v_version_image_gallery" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_listings_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_listings_v_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "attachments" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "property_types" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "reviews" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "team_members_socials" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "team_members" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "forms_blocks_phone_number" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "header_nav_items_nav_item_children_links" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_columns_block_columns" CASCADE;
  DROP TABLE "pages_blocks_columns_block" CASCADE;
  DROP TABLE "pages_blocks_number_counters_block_number_counters" CASCADE;
  DROP TABLE "pages_blocks_number_counters_block" CASCADE;
  DROP TABLE "pages_blocks_expertise_block_expertise_areas" CASCADE;
  DROP TABLE "pages_blocks_expertise_block" CASCADE;
  DROP TABLE "_pages_v_blocks_columns_block_columns" CASCADE;
  DROP TABLE "_pages_v_blocks_columns_block" CASCADE;
  DROP TABLE "_pages_v_blocks_number_counters_block_number_counters" CASCADE;
  DROP TABLE "_pages_v_blocks_number_counters_block" CASCADE;
  DROP TABLE "_pages_v_blocks_expertise_block_expertise_areas" CASCADE;
  DROP TABLE "_pages_v_blocks_expertise_block" CASCADE;
  DROP TABLE "listings_image_gallery" CASCADE;
  DROP TABLE "listings" CASCADE;
  DROP TABLE "listings_rels" CASCADE;
  DROP TABLE "_listings_v_version_image_gallery" CASCADE;
  DROP TABLE "_listings_v" CASCADE;
  DROP TABLE "_listings_v_rels" CASCADE;
  DROP TABLE "attachments" CASCADE;
  DROP TABLE "property_types" CASCADE;
  DROP TABLE "reviews" CASCADE;
  DROP TABLE "team_members_socials" CASCADE;
  DROP TABLE "team_members" CASCADE;
  DROP TABLE "forms_blocks_phone_number" CASCADE;
  DROP TABLE "header_nav_items_nav_item_children_links" CASCADE;
  ALTER TABLE "redirects_rels" DROP CONSTRAINT "redirects_rels_listings_fk";
  
  ALTER TABLE "search_rels" DROP CONSTRAINT "search_rels_listings_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_listings_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_attachments_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_property_types_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_reviews_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_team_members_fk";
  
  ALTER TABLE "header" DROP CONSTRAINT "header_logo_id_media_id_fk";
  
  ALTER TABLE "header" DROP CONSTRAINT "header_logo_alt_id_media_id_fk";
  
  ALTER TABLE "footer" DROP CONSTRAINT "footer_logo_id_media_id_fk";
  
  DROP INDEX IF EXISTS "redirects_rels_listings_id_idx";
  DROP INDEX IF EXISTS "search_rels_listings_id_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_listings_id_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_attachments_id_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_property_types_id_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_reviews_id_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_team_members_id_idx";
  DROP INDEX IF EXISTS "header_logo_idx";
  DROP INDEX IF EXISTS "header_logo_alt_idx";
  DROP INDEX IF EXISTS "footer_logo_idx";
  ALTER TABLE "forms_blocks_checkbox" ALTER COLUMN "width" SET DATA TYPE numeric;
  ALTER TABLE "forms_blocks_country" ALTER COLUMN "width" SET DATA TYPE numeric;
  ALTER TABLE "forms_blocks_email" ALTER COLUMN "width" SET DATA TYPE numeric;
  ALTER TABLE "forms_blocks_number" ALTER COLUMN "width" SET DATA TYPE numeric;
  ALTER TABLE "forms_blocks_number" ALTER COLUMN "default_value" SET DATA TYPE numeric;
  ALTER TABLE "forms_blocks_state" ALTER COLUMN "width" SET DATA TYPE numeric;
  ALTER TABLE "forms_blocks_text" ALTER COLUMN "width" SET DATA TYPE numeric;
  ALTER TABLE "forms_blocks_textarea" ALTER COLUMN "width" SET DATA TYPE numeric;
  ALTER TABLE "header_nav_items" ADD COLUMN "link_type" "enum_header_nav_items_link_type" DEFAULT 'reference';
  ALTER TABLE "header_nav_items" ADD COLUMN "link_new_tab" boolean;
  ALTER TABLE "header_nav_items" ADD COLUMN "link_url" varchar;
  ALTER TABLE "header_nav_items" ADD COLUMN "link_label" varchar NOT NULL;
  ALTER TABLE "pages_blocks_archive" DROP COLUMN IF EXISTS "layout";
  ALTER TABLE "pages_blocks_archive" DROP COLUMN IF EXISTS "navigation_type";
  ALTER TABLE "pages_blocks_form_block" DROP COLUMN IF EXISTS "styles_global_width";
  ALTER TABLE "pages_blocks_form_block" DROP COLUMN IF EXISTS "styles_resp_pad_hor_desk_val";
  ALTER TABLE "pages_blocks_form_block" DROP COLUMN IF EXISTS "styles_resp_pad_hor_desk_unit";
  ALTER TABLE "pages_blocks_form_block" DROP COLUMN IF EXISTS "styles_resp_pad_vert_desk_val";
  ALTER TABLE "pages_blocks_form_block" DROP COLUMN IF EXISTS "styles_resp_pad_vert_desk_unit";
  ALTER TABLE "pages_blocks_form_block" DROP COLUMN IF EXISTS "styles_resp_pad_hor_tab_val";
  ALTER TABLE "pages_blocks_form_block" DROP COLUMN IF EXISTS "styles_resp_pad_hor_tab_unit";
  ALTER TABLE "pages_blocks_form_block" DROP COLUMN IF EXISTS "styles_resp_pad_vert_tab_val";
  ALTER TABLE "pages_blocks_form_block" DROP COLUMN IF EXISTS "styles_resp_pad_vert_tab_unit";
  ALTER TABLE "pages_blocks_form_block" DROP COLUMN IF EXISTS "styles_resp_pad_hor_mb_val";
  ALTER TABLE "pages_blocks_form_block" DROP COLUMN IF EXISTS "styles_resp_pad_hor_mb_unit";
  ALTER TABLE "pages_blocks_form_block" DROP COLUMN IF EXISTS "styles_resp_pad_vert_mb_val";
  ALTER TABLE "pages_blocks_form_block" DROP COLUMN IF EXISTS "styles_resp_pad_vert_mb_unit";
  ALTER TABLE "_pages_v_blocks_archive" DROP COLUMN IF EXISTS "layout";
  ALTER TABLE "_pages_v_blocks_archive" DROP COLUMN IF EXISTS "navigation_type";
  ALTER TABLE "_pages_v_blocks_form_block" DROP COLUMN IF EXISTS "styles_global_width";
  ALTER TABLE "_pages_v_blocks_form_block" DROP COLUMN IF EXISTS "styles_resp_pad_hor_desk_val";
  ALTER TABLE "_pages_v_blocks_form_block" DROP COLUMN IF EXISTS "styles_resp_pad_hor_desk_unit";
  ALTER TABLE "_pages_v_blocks_form_block" DROP COLUMN IF EXISTS "styles_resp_pad_vert_desk_val";
  ALTER TABLE "_pages_v_blocks_form_block" DROP COLUMN IF EXISTS "styles_resp_pad_vert_desk_unit";
  ALTER TABLE "_pages_v_blocks_form_block" DROP COLUMN IF EXISTS "styles_resp_pad_hor_tab_val";
  ALTER TABLE "_pages_v_blocks_form_block" DROP COLUMN IF EXISTS "styles_resp_pad_hor_tab_unit";
  ALTER TABLE "_pages_v_blocks_form_block" DROP COLUMN IF EXISTS "styles_resp_pad_vert_tab_val";
  ALTER TABLE "_pages_v_blocks_form_block" DROP COLUMN IF EXISTS "styles_resp_pad_vert_tab_unit";
  ALTER TABLE "_pages_v_blocks_form_block" DROP COLUMN IF EXISTS "styles_resp_pad_hor_mb_val";
  ALTER TABLE "_pages_v_blocks_form_block" DROP COLUMN IF EXISTS "styles_resp_pad_hor_mb_unit";
  ALTER TABLE "_pages_v_blocks_form_block" DROP COLUMN IF EXISTS "styles_resp_pad_vert_mb_val";
  ALTER TABLE "_pages_v_blocks_form_block" DROP COLUMN IF EXISTS "styles_resp_pad_vert_mb_unit";
  ALTER TABLE "redirects_rels" DROP COLUMN IF EXISTS "listings_id";
  ALTER TABLE "search_rels" DROP COLUMN IF EXISTS "listings_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "listings_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "attachments_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "property_types_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "reviews_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "team_members_id";
  ALTER TABLE "header_nav_items" DROP COLUMN IF EXISTS "nav_item_side";
  ALTER TABLE "header_nav_items" DROP COLUMN IF EXISTS "nav_item_type";
  ALTER TABLE "header_nav_items" DROP COLUMN IF EXISTS "nav_item_link_type";
  ALTER TABLE "header_nav_items" DROP COLUMN IF EXISTS "nav_item_link_new_tab";
  ALTER TABLE "header_nav_items" DROP COLUMN IF EXISTS "nav_item_link_url";
  ALTER TABLE "header_nav_items" DROP COLUMN IF EXISTS "nav_item_link_label";
  ALTER TABLE "header_nav_items" DROP COLUMN IF EXISTS "nav_item_label";
  ALTER TABLE "header_nav_items" DROP COLUMN IF EXISTS "nav_item_enable_parent_link";
  ALTER TABLE "header_nav_items" DROP COLUMN IF EXISTS "nav_item_parent_link_type";
  ALTER TABLE "header_nav_items" DROP COLUMN IF EXISTS "nav_item_parent_link_new_tab";
  ALTER TABLE "header_nav_items" DROP COLUMN IF EXISTS "nav_item_parent_link_url";
  ALTER TABLE "header_nav_items" DROP COLUMN IF EXISTS "nav_item_parent_link_label";
  ALTER TABLE "header" DROP COLUMN IF EXISTS "logo_id";
  ALTER TABLE "header" DROP COLUMN IF EXISTS "logo_alt_id";
  ALTER TABLE "footer" DROP COLUMN IF EXISTS "logo_id";
  DROP TYPE "public"."enum_pages_blocks_archive_layout";
  DROP TYPE "public"."enum_pages_blocks_archive_navigation_type";
  DROP TYPE "public"."enum_pages_blocks_form_block_styles_global_width";
  DROP TYPE "public"."enum_pages_blocks_form_block_styles_resp_pad_hor_desk_unit";
  DROP TYPE "public"."enum_pages_blocks_form_block_styles_resp_pad_vert_desk_unit";
  DROP TYPE "public"."enum_pages_blocks_form_block_styles_resp_pad_hor_tab_unit";
  DROP TYPE "public"."enum_pages_blocks_form_block_styles_resp_pad_vert_tab_unit";
  DROP TYPE "public"."enum_pages_blocks_form_block_styles_resp_pad_hor_mb_unit";
  DROP TYPE "public"."enum_pages_blocks_form_block_styles_resp_pad_vert_mb_unit";
  DROP TYPE "public"."enum_pages_blocks_columns_block_columns_type";
  DROP TYPE "public"."enum_pages_blocks_columns_block_columns_size";
  DROP TYPE "public"."enum_pages_blocks_columns_block_columns_link_type";
  DROP TYPE "public"."pb_columns_block_content_columns_link_appearance";
  DROP TYPE "public"."p_blocks_columns_block_content_columns_media_border_radius";
  DROP TYPE "public"."enum_pages_blocks_columns_block_styles_global_width";
  DROP TYPE "public"."enum__pages_v_blocks_archive_layout";
  DROP TYPE "public"."enum__pages_v_blocks_archive_navigation_type";
  DROP TYPE "public"."enum__pages_v_blocks_form_block_styles_global_width";
  DROP TYPE "public"."enum__pages_v_blocks_form_block_styles_resp_pad_hor_desk_unit";
  DROP TYPE "public"."enum__pages_v_blocks_form_block_styles_resp_pad_vert_desk_unit";
  DROP TYPE "public"."enum__pages_v_blocks_form_block_styles_resp_pad_hor_tab_unit";
  DROP TYPE "public"."enum__pages_v_blocks_form_block_styles_resp_pad_vert_tab_unit";
  DROP TYPE "public"."enum__pages_v_blocks_form_block_styles_resp_pad_hor_mb_unit";
  DROP TYPE "public"."enum__pages_v_blocks_form_block_styles_resp_pad_vert_mb_unit";
  DROP TYPE "public"."enum__pages_v_blocks_columns_block_columns_type";
  DROP TYPE "public"."enum__pages_v_blocks_columns_block_columns_size";
  DROP TYPE "public"."enum__pages_v_blocks_columns_block_columns_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_columns_block_styles_global_width";
  DROP TYPE "public"."enum_listings_availability";
  DROP TYPE "public"."enum_listings_status";
  DROP TYPE "public"."enum__listings_v_version_availability";
  DROP TYPE "public"."enum__listings_v_version_status";
  DROP TYPE "public"."enum_team_members_socials_platform";
  DROP TYPE "public"."enum_forms_blocks_checkbox_width";
  DROP TYPE "public"."enum_forms_blocks_country_width";
  DROP TYPE "public"."enum_forms_blocks_email_width";
  DROP TYPE "public"."enum_forms_blocks_number_width";
  DROP TYPE "public"."enum_forms_blocks_state_width";
  DROP TYPE "public"."enum_forms_blocks_text_width";
  DROP TYPE "public"."enum_forms_blocks_textarea_width";
  DROP TYPE "public"."enum_forms_blocks_phone_number_width";
  DROP TYPE "public"."enum_header_nav_items_nav_item_side";
  DROP TYPE "public"."enum_header_nav_items_nav_item_type";
  DROP TYPE "public"."enum_header_nav_items_nav_item_link_type";
  DROP TYPE "public"."enum_header_nav_items_nav_item_parent_link_type";
  DROP TYPE "public"."enum_header_nav_items_nav_item_children_links_link_type";`)
}
