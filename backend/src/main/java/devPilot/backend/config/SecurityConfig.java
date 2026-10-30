
package devPilot.backend.config;

import lombok.RequiredArgsConstructor;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;

import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;


import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;

import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final OAuth2UserService<OAuth2UserRequest, OAuth2User> githubOAuth2UserService;

    private final AuthenticationSuccessHandler oAuth2SuccessHandler;

    private final AuthenticationFailureHandler oAuth2FailureHandler;

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
            // Enable CORS
            .cors(Customizer.withDefaults())

            // Disable CSRF for API configuration
            .csrf(csrf -> csrf.disable())

            // Session management
            .sessionManagement(session ->
                session.sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED)
            )

            // Authorization rules
            .authorizeHttpRequests(auth -> auth

                .requestMatchers(
                    "/api/auth/login-url",
                    "/oauth2/**",
                    "/login/oauth2/**",
                    "/error"
                ).permitAll()

                .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()

                .requestMatchers("/api/**").authenticated()

                .anyRequest().permitAll()
            )

            // Exception handling
            .exceptionHandling(ex ->
                ex.authenticationEntryPoint(
                    new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED)
                )
            )

            // OAuth2 Login
            .oauth2Login(oauth -> oauth

                .userInfoEndpoint(userInfo ->
                    userInfo.userService(githubOAuth2UserService)
                )

                .successHandler(oAuth2SuccessHandler)

                .failureHandler(oAuth2FailureHandler)
            )

            // Logout
            .logout(logout -> logout

                .logoutUrl("/api/auth/logout")

                .logoutSuccessHandler((request, response, authentication) ->
                    response.setStatus(HttpStatus.NO_CONTENT.value())
                )

                .invalidateHttpSession(true)

                .clearAuthentication(true)

                .deleteCookies("JSESSIONID", "DEVPILOT_SESSION")
            );

        return http.build();
    }

// @Bean
// AuthenticationSuccessHandler oauth2SuccessHandler(
//         @Value("${app.frontend-url}") String frontendUrl) {

//     SimpleUrlAuthenticationSuccessHandler handler =
//             new SimpleUrlAuthenticationSuccessHandler();

//     handler.setDefaultTargetUrl(frontendUrl + "/auth/callback");

//     return handler;
// }

// @Bean
// AuthenticationFailureHandler oauth2FailureHandler(
//         @Value("${app.frontend-url}") String frontendUrl) {

//     SimpleUrlAuthenticationFailureHandler handler =
//             new SimpleUrlAuthenticationFailureHandler();

//     handler.setDefaultFailureUrl(frontendUrl + "/login?error=oauth_failed");

//     return handler;
// }
}
