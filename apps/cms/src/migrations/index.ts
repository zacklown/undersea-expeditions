import * as migration_20260610_161320_init from './20260610_161320_init';
import * as migration_20260610_164628_add_trip_map_pins from './20260610_164628_add_trip_map_pins';
import * as migration_20260610_170256_make_trip_map_pin_optional_and_expand_palette from './20260610_170256_make_trip_map_pin_optional_and_expand_palette';
import * as migration_20260610_172500_add_trip_year_legacy_url_and_homepage_pin_visibility from './20260610_172500_add_trip_year_legacy_url_and_homepage_pin_visibility';
import * as migration_20260610_175900_convert_trip_includes_to_richtext from './20260610_175900_convert_trip_includes_to_richtext';
import * as migration_20260610_201500_refresh_homepage_content_model from './20260610_201500_refresh_homepage_content_model';
import * as migration_20260610_203500_relax_legacy_home_page_constraints from './20260610_203500_relax_legacy_home_page_constraints';
import * as migration_20260611_220000_add_trip_banner_and_insurance_fields from './20260611_220000_add_trip_banner_and_insurance_fields';
import * as migration_20260613_101500_replace_trip_gallery_with_social_embeds from './20260613_101500_replace_trip_gallery_with_social_embeds';
import * as migration_20260614_090700_add_socials_and_about_pages from './20260614_090700_add_socials_and_about_pages';
import * as migration_20260614_091500_remove_galleries_collection from './20260614_091500_remove_galleries_collection';
import * as migration_20260614_124500_add_about_hero_image from './20260614_124500_add_about_hero_image';
import * as migration_20260714_120000_add_trip_status_label from './20260714_120000_add_trip_status_label';

export const migrations = [
  {
    up: migration_20260610_161320_init.up,
    down: migration_20260610_161320_init.down,
    name: '20260610_161320_init',
  },
  {
    up: migration_20260610_164628_add_trip_map_pins.up,
    down: migration_20260610_164628_add_trip_map_pins.down,
    name: '20260610_164628_add_trip_map_pins',
  },
  {
    up: migration_20260610_170256_make_trip_map_pin_optional_and_expand_palette.up,
    down: migration_20260610_170256_make_trip_map_pin_optional_and_expand_palette.down,
    name: '20260610_170256_make_trip_map_pin_optional_and_expand_palette'
  },
  {
    up: migration_20260610_172500_add_trip_year_legacy_url_and_homepage_pin_visibility.up,
    down: migration_20260610_172500_add_trip_year_legacy_url_and_homepage_pin_visibility.down,
    name: '20260610_172500_add_trip_year_legacy_url_and_homepage_pin_visibility'
  },
  {
    up: migration_20260610_175900_convert_trip_includes_to_richtext.up,
    down: migration_20260610_175900_convert_trip_includes_to_richtext.down,
    name: '20260610_175900_convert_trip_includes_to_richtext'
  },
  {
    up: migration_20260610_201500_refresh_homepage_content_model.up,
    down: migration_20260610_201500_refresh_homepage_content_model.down,
    name: '20260610_201500_refresh_homepage_content_model'
  },
  {
    up: migration_20260610_203500_relax_legacy_home_page_constraints.up,
    down: migration_20260610_203500_relax_legacy_home_page_constraints.down,
    name: '20260610_203500_relax_legacy_home_page_constraints'
  },
  {
    up: migration_20260611_220000_add_trip_banner_and_insurance_fields.up,
    down: migration_20260611_220000_add_trip_banner_and_insurance_fields.down,
    name: '20260611_220000_add_trip_banner_and_insurance_fields'
  },
  {
    up: migration_20260613_101500_replace_trip_gallery_with_social_embeds.up,
    down: migration_20260613_101500_replace_trip_gallery_with_social_embeds.down,
    name: '20260613_101500_replace_trip_gallery_with_social_embeds'
  },
  {
    up: migration_20260614_090700_add_socials_and_about_pages.up,
    down: migration_20260614_090700_add_socials_and_about_pages.down,
    name: '20260614_090700_add_socials_and_about_pages'
  },
  {
    up: migration_20260614_091500_remove_galleries_collection.up,
    down: migration_20260614_091500_remove_galleries_collection.down,
    name: '20260614_091500_remove_galleries_collection'
  },
  {
    up: migration_20260614_124500_add_about_hero_image.up,
    down: migration_20260614_124500_add_about_hero_image.down,
    name: '20260614_124500_add_about_hero_image'
  },
  {
    up: migration_20260714_120000_add_trip_status_label.up,
    down: migration_20260714_120000_add_trip_status_label.down,
    name: '20260714_120000_add_trip_status_label'
  },
];
