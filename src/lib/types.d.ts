export type UserTableRow = {
  country: string;
  phone: string;
  birthdate: string;
  status: boolean;
  id: string;
  name: string;
  profilePhoto: string | undefined;

  email: string;
  createdAt: string | null;
  updatedAt: string | null;
  deletedAt: string | null;
};

export type UserRaw = {
  id: string;
  display_name: string;
  has_password: boolean;
  is_anonymous: boolean;
  primary_email: string;
  selected_team: unknown | null;
  auth_with_email: boolean;
  client_metadata: {
    name: string;
    email: string;
    phone: string;
    country: string;
    birthdate: string;
  };
  oauth_providers: unknown[];
  server_metadata: {
    name: string;
    email: string;
    phone: string;
    country: string;
    birthdate: string;
  };
  otp_auth_enabled: boolean;
  selected_team_id: unknown | null;
  profile_image_url: string | null;
  requires_totp_mfa: boolean;
  signed_up_at_millis: number;
  passkey_auth_enabled: boolean;
  last_active_at_millis: number;
  primary_email_verified: boolean;
  client_read_only_metadata: unknown | null;
  primary_email_auth_enabled: boolean;
};

export type UserAvatar = {
  id: string;
  profileImageUrl: string | null;
  displayName: string | null;
};
