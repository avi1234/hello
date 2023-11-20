def discover_users(
        self,
    ):
        organizations_names = [
            organization['attributes']['name']
            for organization in self.terraform_api.get_organizations()['data']
        ]

        for organization_name in organizations_names:
            organization_memberships = self.terraform_api.get_organization_memberships(organization_name)

            organization_users = [
                {
                    'user_id': user['relationships']['user']['data']['id'],
                    'user_email': user['attributes']['email'],
                } for user in organization_memberships
            ]

            for organization_user in organization_users:
                user_id = organization_user['user_id']
                user_email = organization_user['user_email']

                if user_id in self.discovered_user_ids:
                    continue

                user_details = self.terraform_api.get_user(user_id)['data']['attributes']
                user_name = user_details['username']
                user_additional = {
                    'is_service_account': user_details['is-service-account'],
                    'avatar_url': user_details['avatar-url'],
                    'can_create_organizations': user_details['permissions']['can-create-organizations'],
                }

                user_object = {
                    'user_id': user_id,
                    'username': user_name,
                    'user_email': user_email,
                    'additional': user_additional,
                    'is_enabled': True,
                }

                discovered_object = {
                    'data': user_object,
                }

                self.discovered_user_ids.append(user_id)

                yield discovered_object
