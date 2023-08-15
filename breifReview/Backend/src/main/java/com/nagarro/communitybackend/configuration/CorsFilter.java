package com.nagarro.communitybackend.configuration;

import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import com.nagarro.communitybackend.constants.Constants;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Component
@Order(Ordered.HIGHEST_PRECEDENCE)
public class CorsFilter implements Filter {

    @Value("${app.client.url}")
    private String clientAppUrl = "";

    public CorsFilter() {
    }

    @Override
    public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain) throws IOException, ServletException {
        HttpServletResponse response = (HttpServletResponse) res;
        HttpServletRequest request = (HttpServletRequest) req;
        Map<String, String> map = new HashMap<>();
        String originHeader = request.getHeader(Constants.ORIGIN);
        response.setHeader(Constants.ALLOW_ORIGIN, originHeader);
        response.setHeader(Constants.ALLOW_METHODS, Constants.METHODS);
        response.setHeader(Constants.ALLOW_MAX_AGE, Constants.MAX_AGE);
        response.setHeader(Constants.ALLOW_HEADERS, Constants.ALL);

        if (Constants.OPTIONS.equalsIgnoreCase(request.getMethod())) {
            response.setStatus(HttpServletResponse.SC_OK);
        } else {
            chain.doFilter(req, res);
        }
    }

    @Override
    public void init(FilterConfig filterConfig) {
    }

    @Override
    public void destroy() {
    }
}

